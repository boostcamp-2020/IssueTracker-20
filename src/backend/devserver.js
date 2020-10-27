import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../frontend/webpack.config';

const webpackDevConfig = webpackConfig('development');
const compiler = webpack(webpackDevConfig);
const hotModule = WebpackHotMiddleware(compiler);

const useDevServer = (app) => {
  app.use(WebpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
  }));
  app.use(hotModule);
};

export default useDevServer;
