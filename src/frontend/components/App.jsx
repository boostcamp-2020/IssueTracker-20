import { hot } from 'react-hot-loader/root';
import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import LoginPage from '@Components/Login';
import IssuePage from '@Components/IssuePage';

import PrivateRoute from '@Components/PrivateRoute';

const App = () => {
  console.log('App loaded!');

  return (
      <div>
        <Switch>
          <PrivateRoute exact path="/">
            <IssuePage />
          </PrivateRoute>
          <Route path="/login" component={LoginPage} />
        </Switch>
      </div>
  );
};

export default hot(App);
