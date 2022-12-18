import axios from 'axios';
import { objectToQueryString } from 'react-project-management';
import {logout} from "store/reducers/authSlice";
import { store } from 'store';

const token = () => {
  const getUser=store.getState().auth.user;
  if (getUser === null || getUser === undefined || getUser === '') {
    return '';
  }
  return `${getUser.tokenType} ${getUser.accessToken}`;
};
const defaults = {
  baseURL: process.env.API_URL || 'http://139.59.96.208:8000',
  headers: () => ({
    'Content-Type': 'multipart/form-data;boundary=<calculated when request is sent>',
    Authorization: token(),
    accept:'*/*',
  }),
  error: {
    code: 'INTERNAL_ERROR',
    message: 'Something went wrong. Please check your internet connection or contact our support.',
    status: 503,
    data: {},
  },
};

const api = (method, url, variables) =>
  new Promise((resolve, reject) => {
    axios({
      url: `${defaults.baseURL}${url}`,
      method,
      withCredentials: true,
      headers: defaults.headers(),
      params: method === 'get' ? variables : undefined,
      data: method !== 'get' ? variables : undefined,
      paramsSerializer: objectToQueryString,
    }).then(
      response => {
        resolve(response.data);
      },
      error => {
        if (error.response) {
          if (error.response.data.code === 401) {
            store.dispatch(logout())
          } else {
            reject(error.response.data.message);
          }
        } else {
          reject(defaults.error);
        }
      },
    );
  });


export default {
  post: (...args) => api('post', ...args),
};
