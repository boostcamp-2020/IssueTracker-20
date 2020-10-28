import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { githubAuthenticate, isLoggedIn } from '../middlewares/auth';

const router = Router();

router.get(
  '/github',
  githubAuthenticate,
);
router.get(
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

router.get(
  '/profile',
  isLoggedIn,
  (req, res) => {
    res.send(req.user);
  },
);

export default router;
