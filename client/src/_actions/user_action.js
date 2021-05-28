import Axios from 'axios';
import { LOGIN_USER, SIGN_UP_USER } from './types';

export async function loginUser(loginInfo) {
  const request = await Axios.post('/api/users/login', loginInfo);
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export async function registerUser(signUpInfo) {
  const request = await Axios.post('/api/users/register', signUpInfo);

  return {
    type: SIGN_UP_USER,
    payload: request,
  };
}
