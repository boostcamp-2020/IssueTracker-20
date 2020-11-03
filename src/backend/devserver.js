import path from 'path';
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
  app.use('/', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) return next(err);
      return res.send(result.toString());
    });
  });
};

export default useDevServer;
