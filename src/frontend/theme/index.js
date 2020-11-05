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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  button {
    border: none;
    outline: none;
    &:not(:disabled) {
      cursor: pointer;
    }
  }
  input {
    outline: none;
  }
`;

export const theme = {
  mainColor: '',
  grayBorderColor: '#1b1f2326',
  grayButtonColor: '#fafbfc',
  grayButtonHoverColor: '#f3f4f6',
  grayButtonFocusColor: '#1b1f2326',

  whiteButtonColor: '#ffffff',
  whiteButtonHoverColor: '#fafbfc',

  inputBorderColor: '#e1e4e8',
  inputBorderActiveColor: '#0366d6',
  inputShadowColor: '#0366d64d',
  inputBgColor: '#fafbfc',

  textColor: '#212121',
  headerColor: '#24292e',
  buttonColor: '#2ea44f',
  buttonBorderColor: '#1b1f2326',
  buttonHoverColor: '#278a43',

  menuBarBgColor: '#f6f8fa',
  menuBarBorderColor: '#e1e4e8',
  unActiveButtonColor: '#99CC99',
  subButtonColor: '#eee',
  whiteColor: '#ffffff',
  commonTextColor: '#222222',
  shadowColor: '#CCCCCC',

  userNameColor: '#333333',
  timeBoardColor: '#777777',

  badgeColor: '#e5e8ea',
  subTextColor: '#576069',

  closeIssueColor: '#cc2431',
};
