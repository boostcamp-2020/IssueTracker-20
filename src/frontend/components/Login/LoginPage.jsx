import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  margin-bottom: 1em;
  padding: 0;
`;

const FlexColumnBox = styled.div`
  display: flex;
  flex-flow: column;
`;

const FlexRowBox = styled.div`
  display: flex;
  flex-flow: row;
`;

const LoginPage = styled(FlexColumnBox)`
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #eee;
`;

const InputLayer = styled(FlexColumnBox)`
  width: 300px;
  background-color: white;
  padding: 20px;

  & > * {
    margin-bottom: 0.5em;
  }
`;

const InputLabel = styled.label`
`;

const Button = styled.button`
  background-color: #B6B1AC;
  height: 2em;
  color: white;
`;

const RowAroundBox = styled(FlexRowBox)`
  justify-content: space-around;
`;

const gitAuth = () => {
  window.location.assign('api/auth/github');
};

const Login = () => (
  <LoginPage>
    <Title>이슈 크래커</Title>
    <InputLayer>
      <InputLabel>아이디</InputLabel>
      <input type='text' name='id'></input>
      <InputLabel>비밀번호</InputLabel>
      <input type='password' name='password'></input>
      <RowAroundBox>
        <a href='#'>로그인</a>
        <a href='#'>회원가입</a>
      </RowAroundBox>
      <Button onClick={gitAuth}>Sign in with GitHub</Button>
    </InputLayer>
  </LoginPage>
);

export default Login;
