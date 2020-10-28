import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  margin-bottom: 1em;
  padding: 0;
`;

const FlexColumnBox = `
  display: flex;
  flex-flow: column;
`;

const FlexRowBox = `
  display: flex;
  flex-flow: row;
`;

const LoginPage = styled.div`
  ${FlexColumnBox}
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #eee;
`;

const InputLayer = styled.form`
  ${FlexColumnBox}
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

const RowAroundBox = styled.div`
  ${FlexRowBox}
  justify-content: space-around;
`;

const TextButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const submitHandler = (e) => {
  e.preventDefault();
  alert(`${e.target.id.value}님 지금은 사용하실 수 없어요.`);
};

const signinButtonHandler = () => {
  alert('지금은 사용하실 수 없어요.');
};

const gitAuth = () => {
  window.location.assign('api/auth/github');
};

const Login = () => (
  <LoginPage>
    <Title>이슈 크래커</Title>
    <InputLayer onSubmit={submitHandler}>
      <InputLabel>아이디</InputLabel>
      <input type='text' name='id'></input>
      <InputLabel>비밀번호</InputLabel>
      <input type='password' name='password'></input>
      <RowAroundBox>
        <TextButton type='submit'>로그인</TextButton>
        <TextButton type='button' onClick={signinButtonHandler}>회원가입</TextButton>
      </RowAroundBox>
      <Button type='button' onClick={gitAuth}>Sign in with GitHub</Button>
    </InputLayer>
  </LoginPage>
);

export default Login;
