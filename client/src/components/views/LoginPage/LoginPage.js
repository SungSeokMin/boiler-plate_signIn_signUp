import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

const loginPageStyle = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const LoginPage = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeHandler = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let body = {
      email,
      password,
    };

    dispatch(loginUser(body)).then((res) => {
      if (res.payload.data.loginSuccess) {
        props.history.push('/');
      } else {
        alert('Error');
      }
    });
  };

  return (
    <div style={loginPageStyle}>
      <form style={formStyle} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={email} name="email" onChange={onChangeHandler} />
        <label>Password</label>
        <input type="password" value={password} name="password" onChange={onChangeHandler} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
