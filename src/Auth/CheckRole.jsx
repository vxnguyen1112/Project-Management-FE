/* eslint-disable default-case */
import { store } from 'store';

const CheckRole = () => {
  if (store.getState().auth.user.roles.indexOf('ROLE_MEMBER') >= 0) return false;
  return true;
};
export default CheckRole;
