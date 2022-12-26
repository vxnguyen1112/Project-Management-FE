/* eslint-disable default-case */
import { store } from 'store';

const CheckRole = () => {
  if (store.getState().auth.user.roles.indexOf('ROLE_ADMIN_ORGANIZATION') >= 0) return true;
  return false;
};
export default CheckRole;
