module.exports = (isEnvDevelopment) => ({
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    'babel-plugin-styled-components',
    isEnvDevelopment && 'react-hot-loader/babel',
  ].filter(Boolean),
});
