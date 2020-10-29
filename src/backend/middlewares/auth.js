import passport from 'passport';

const githubAuthenticate = (req, res, next) => {
  passport.authenticate('github', { session: false })(req, res, next);
};
const isLoggedIn = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    if (!user) return res.status(403).send({ message: 'Forbidden user.' });
    req.user = user;
    return next();
  })(req, res, next);
};

export { isLoggedIn, githubAuthenticate };
