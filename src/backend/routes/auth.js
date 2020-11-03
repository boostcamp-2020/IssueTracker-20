import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { githubAuthenticate, isLoggedIn } from '../middlewares/auth';

const AuthRouter = Router();

AuthRouter.get(
  '/github',
  githubAuthenticate,
);
AuthRouter.get(
  '/github/callback',
  githubAuthenticate,
  (req, res) => {
    jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      // TODO: token을 client에 넘겨주는 방법에 대해 생각한다.
      res.cookie('accessToken', token);
      res.redirect('/');
    });
  },
);

AuthRouter.get(
  '/profile',
  isLoggedIn,
  (req, res) => {
    res.json(req.user);
  },
);

export default AuthRouter;
