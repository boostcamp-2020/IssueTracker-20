import { hot } from 'react-hot-loader/root';
import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Login from './Login';
import Main from './Main';
import PrivateRoute from './PrivateRoute';

const App = () => {
  console.log('App loaded!');

  return (
      <div>
        <Switch>
          <PrivateRoute exact path="/">
            <Main />
          </PrivateRoute>
          <Route path="/login" component={Login} />
        </Switch>
      </div>
  );
};

export default hot(App);
