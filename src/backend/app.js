import path from 'path';
import express from 'express';

const app = express();
const port = 3000;

app.use(express.static(path.resolve(__dirname, './public')));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
