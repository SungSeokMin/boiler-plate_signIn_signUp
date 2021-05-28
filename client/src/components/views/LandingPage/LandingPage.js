import React from 'react';

const loadingPageStyle = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const LandingPage = () => {
  return (
    <div style={loadingPageStyle}>
      <h1>시작페이지</h1>
    </div>
  );
};

export default LandingPage;
