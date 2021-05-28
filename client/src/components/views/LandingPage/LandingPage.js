import React from 'react';
import Axios from 'axios';

const loadingPageStyle = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const LandingPage = (props) => {
  const onClickHandler = () => {
    Axios.get('/api/users/logout').then((res) => {
      console.log(res);
      if (res.data.success) {
        props.history.push('/login');
      } else {
        alert('로그아웃 실패');
      }
    });
  };

  return (
    <div style={loadingPageStyle}>
      <h1>시작페이지</h1>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
};

export default LandingPage;
