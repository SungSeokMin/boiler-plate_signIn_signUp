import { LOGIN_USER, SIGN_UP_USER } from '../_actions/types';

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case SIGN_UP_USER:
      return { ...state, register: action.payload };
    default:
      return state;
  }
}
