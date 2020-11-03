import { hot } from 'react-hot-loader/root';
import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import LoginPage from './Login';
import Issue from './Issue';
import PrivateRoute from './PrivateRoute';

const App = () => {
  console.log('App loaded!');

  return (
      <div>
        <Switch>
          <PrivateRoute exact path="/">
            <Issue />
          </PrivateRoute>
          <Route path="/login" component={LoginPage} />
        </Switch>
      </div>
  );
};

export default hot(App);
