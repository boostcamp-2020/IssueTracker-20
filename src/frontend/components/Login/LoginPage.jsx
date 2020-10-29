import React from 'react';
import styled from 'styled-components';
import GitHubLogo from './GitHub.svg';

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
  min-width: 100vw;
  max-width: 100%;
  min-height: 100vh;
  max-height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #eee;
`;

const InputLayer = styled.form`
  ${FlexColumnBox}
  width: 300px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;

  & > * {
    margin-bottom: 0.5em;
  }
`;

const InputLabel = styled.label`
`;

const GitHubButton = styled.button`
  ${FlexRowBox}
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.headerColor};
  color: white;
  fill: white;

  & > * {
    padding: 0.5em;
  }
`;

const RowAroundBox = styled.div`
  ${FlexRowBox}
  justify-content: space-around;
`;

const TextButton = styled.button`
  background-color: transparent;
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
      <InputLabel for='id'>아이디</InputLabel>
      <input
      type='text'
      name='id'
      id='id'
      minLength='6'
      maxLength='16'
      required
      autoFocus
      ></input>
      <InputLabel for='password'>비밀번호</InputLabel>
      <input
      type='password'
      name='password'
      id='password'
      minLength='6'
      maxLength='12'
      required
      ></input>
      <RowAroundBox>
        <TextButton type='submit'>로그인</TextButton>
        <TextButton type='button' onClick={signinButtonHandler}>회원가입</TextButton>
      </RowAroundBox>
      <GitHubButton type='button' onClick={gitAuth}>
        Sign in with GitHub
        <GitHubLogo />
      </GitHubButton>
    </InputLayer>
  </LoginPage>
);

export default Login;
