import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    min-height: 100vh;
  }
  button {
    border: none;
    &:not(:disabled) {
      cursor: pointer;
    }
  }
`;

export const theme = {
  mainColor: '',
  textColor: '#212121',
  headerColor: '#24292e',
};
