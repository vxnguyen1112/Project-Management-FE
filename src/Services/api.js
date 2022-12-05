import axios from 'axios';
import { toast , objectToQueryString , getStoredAuthToken, removeStoredAuthToken } from 'react-project-management';
import history from 'browserHistory';

const token=(authToken)=>
{
if (authToken === null || authToken === undefined || authToken === '') {
  return ''
} 
 return `Bearer ${authToken}`;

}
const defaults = {
  baseURL: process.env.API_URL || 'http://139.59.96.208:8000',
  headers: () => ({
    'Content-Type': 'application/json',
    Authorization: token(getStoredAuthToken()),
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
            removeStoredAuthToken();
            history.push('/login');
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
