import path from 'path';
import express from 'express';
import useDevServer from './devserver';

const app = express();
const port = 3000;

if (process.env.NODE_ENV === 'development') useDevServer(app);
else app.use(express.static(path.resolve(__dirname, './public')));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
