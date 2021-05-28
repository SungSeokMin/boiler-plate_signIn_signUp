import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

const registerPage = {
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

const RegisterPage = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const onChangeHandler = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'name':
        return setName(value);
      case 'password':
        return setPassword(value);
      case 'checkPassword':
        return setCheckPassword(value);
      default:
        return;
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (password !== checkPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다');
    }

    let body = {
      email,
      name,
      password,
      checkPassword,
    };

    dispatch(registerUser(body)).then((res) => {
      console.log(res);
      if (res.payload.data.success) {
        props.history.push('/login');
      } else {
        alert('회원가입 실패');
      }
    });
  };
  return (
    <div style={registerPage}>
      <form style={formStyle} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={email} name="email" onChange={onChangeHandler} />
        <label>Name</label>
        <input type="text" value={name} name="name" onChange={onChangeHandler} />
        <label>Password</label>
        <input type="password" value={password} name="password" onChange={onChangeHandler} />
        <label>checkPassword</label>
        <input
          type="password"
          value={checkPassword}
          name="checkPassword"
          onChange={onChangeHandler}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default RegisterPage;
