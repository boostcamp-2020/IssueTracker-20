import { hot } from 'react-hot-loader/root';
import React from 'react';
import styled from 'styled-components';
import { Switch, Route, Link } from 'react-router-dom';
import LoginPage from '@Components/Login';
import IssuePage from '@Components/IssuePage';
import IssueForm from '@Components/IssueForm';
import IssueDetail from '@Components/IssueDetail';
import PrivateRoute from '@Components/PrivateRoute';
import NotFound from '@Components/NotFound';
import ProvideAuth from './ProvideAuth.jsx';

const App = () => (
  <ProvideAuth>
    <Topbar><CustomLink to='/'>ISSUE CRACKER</CustomLink></Topbar>
    <Switch>
      <PrivateRoute exact path="/issue/template">
        <IssueForm />
      </PrivateRoute>
      <PrivateRoute exact path="/issue/:id">
        <IssueDetail />
      </PrivateRoute>
      <PrivateRoute exact path="/">
        <IssuePage />
      </PrivateRoute>
      <Route path="/login" component={LoginPage} />
      <Route path="*" component={NotFound} />
    </Switch>
  </ProvideAuth>
);

const FlexRowBox = `
display: flex;
flex-flow: row;
`;

const Topbar = styled.div`
  ${FlexRowBox}
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.headerColor};
  align-items: center;
  justify-content: center;
  color: white;
`;

const CustomLink = styled(Link)`
  color: white;
`;

export default hot(App);
