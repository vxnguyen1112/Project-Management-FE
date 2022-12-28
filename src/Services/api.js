import axios from 'axios';
import { toast , objectToQueryString } from 'react-project-management';
import {logout} from "store/reducers/authSlice";
import { store } from 'store';

const token = () => {
  const getUser=store.getState().auth.user;
  if (getUser === null || getUser === undefined || getUser === '') {
    return '';
  }
  return `${getUser.tokenType} ${getUser.accessToken}`;
};
const PROJECT_ID = () => {
  console.log(`id project ${store.getState().listproject.projectId}`)
  const getprojectID=store.getState().listproject.projectId;
  if (getprojectID === null || getprojectID === undefined || getprojectID === '') {
    return '';
  }
  return store.getState().listproject.projectId;
};
const defaults = {
  baseURL: process.env.API_URL || 'http://165.232.173.235:8000',
  headers: () => ({
    'Content-Type': 'application/json',
    Authorization: token(),
    accept:'*/*',
    "PROJECT-ID":PROJECT_ID()
  }),
  error: {
    code: 'INTERNAL_ERROR',
    message: 'Something went wrong. Please check your internet connection or contact our support.',
    status: 503,
    data: {},
  },
};
const clear =(obj)=>{
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined||obj[propName]==='') {
      delete obj[propName];
    }
  }
  return obj

}
const api = (method, url, variables) =>
  new Promise((resolve, reject) => {
    axios({
      url: `${defaults.baseURL}${url}`,
      method,
      withCredentials: true,
      headers:clear(defaults.headers()),
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

const optimisticUpdate = async (url, { updatedFields, currentFields, setLocalData }) => {
  try {
    setLocalData(updatedFields);
    await api('put', url, updatedFields);
  } catch (error) {
    setLocalData(currentFields);
    toast.error(error);
  }
};

export default {
  get: (...args) => api('get', ...args),
  post: (...args) => api('post', ...args),
  put: (...args) => api('put', ...args),
  patch: (...args) => api('patch', ...args),
  delete: (...args) => api('delete', ...args),
  optimisticUpdate,
};
