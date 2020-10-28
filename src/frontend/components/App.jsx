import { hot } from 'react-hot-loader/root';
import React from 'react';
import Login from './Login';

const App = () => {
  console.log('App loaded!');

  return (
  <div>
    <Login />
  </div>
  );
};

export default hot(App);
