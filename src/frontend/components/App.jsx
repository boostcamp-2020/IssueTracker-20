import { hot } from 'react-hot-loader/root';
import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import LoginPage from '@Components/Login';
import IssuePage from '@Components/IssuePage';
import IssueForm from '@Components/IssueForm';
import PrivateRoute from '@Components/PrivateRoute';
import NotFound from '@Components/NotFound';

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
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
};

export default hot(App);
