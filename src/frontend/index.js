import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import ProvideAuth from '@Components/ProvideAuth/ProvideAuth';
import { theme, GlobalStyle } from './theme';
import App from './components/App.jsx';

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ProvideAuth>
        <App />
        <GlobalStyle />
      </ProvideAuth>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
