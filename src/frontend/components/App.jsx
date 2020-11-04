import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './Login';
import IssuePage from './Issue';
import IssueForm from './IssueForm';
import PrivateRoute from './PrivateRoute';

const App = () => {
  console.log('App loaded!');

  return (
    <div>
      <Switch>
        <PrivateRoute exact path="/">
          <IssuePage />
        </PrivateRoute>
        <Route exact path="/issue/template" component={IssueForm} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
};

export default hot(App);
