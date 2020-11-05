import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from '@Components/Login';
import IssuePage from '@Components/IssuePage';
import IssueForm from '@Components/IssueForm';
import IssueDetail from '@Components/IssueDetail';
import PrivateRoute from '@Components/PrivateRoute';
import NotFound from '@Components/NotFound';

const App = () => {
  console.log('App loaded!');

  return (
    <div>
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
    </div>
  );
};

export default hot(App);
