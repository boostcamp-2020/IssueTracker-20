import { hot } from 'react-hot-loader/root';
import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import LoginPage from './Login';

import IssuePage from './IssuePage';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';

const App = () => {
  console.log('App loaded!');

  return (
      <div>
        <Switch>
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
