import { getStoredAuthToken } from 'react-project-management';

export const isAuthenticated = () => {
  const authToken = getStoredAuthToken();
  if (authToken === null || authToken === undefined || authToken === '') {
    return false;
  }
  return true;
};
