module.exports = (isEnvDevelopment) => ({
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    isEnvDevelopment && 'react-hot-loader/babel',
  ].filter(Boolean),
});
