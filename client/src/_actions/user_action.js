import Axios from 'axios';
import { LOGIN_USER } from './types';

export async function loginUser(loginInfo) {
  const request = await Axios.post('/api/users/login', loginInfo);
  return {
    type: LOGIN_USER,
    payload: request,
  };
}
