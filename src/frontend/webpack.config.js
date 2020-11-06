const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const babelConfig = require('./babel.config.js');

module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  let frontendPath;
  if (isEnvDevelopment) {
    frontendPath = '../src/frontend';
  } else {
    frontendPath = './';
  }

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    entry: isEnvDevelopment
      ? [
        'babel-polyfill',
        'webpack-hot-middleware/client?reload=true',
        'react-hot-loader/patch',
        path.resolve(__dirname, '../src/frontend/index.js'),
      ]
      : [
        'babel-polyfill',
        path.resolve(__dirname, './index.js'),
      ],
    output: isEnvDevelopment
      ? {
        publicPath: '/',
      }
      : {
        path: path.resolve(__dirname, '../../dist/public'),
        filename: '[name].bundle.js',
      },
    plugins: [
      new HtmlWebpackPlugin({
        template: isEnvDevelopment
          ? path.resolve(__dirname, '../src/frontend/resources/index.html')
          : path.resolve(__dirname, './resources/index.html'),
      }),
      isEnvProduction && new CleanWebpackPlugin(),
      isEnvDevelopment && new HotModuleReplacementPlugin(),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: babelConfig(isEnvDevelopment),
          },
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    ...(isEnvDevelopment
      ? {
        devtool: 'source-map',
        resolve: {
          alias: {
            'react-dom': '@hot-loader/react-dom',
          },
        },
      }
      : undefined),
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        '@Components': path.resolve(__dirname, frontendPath, 'components'),
        '@Common': path.resolve(__dirname, frontendPath, 'components/Common'),
        '@Images': path.resolve(__dirname, frontendPath, 'resources/images'),
        '@Util': path.resolve(__dirname, frontendPath, 'util'),
      },
    },
  };
};
