import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GitHubStrategy } from 'passport-github2';
import db from '../models';

const setupPassport = (app) => {
  app.use(passport.initialize());

  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  }, (jwtPayload, done) => {
    const { id } = jwtPayload;
    db.User.findByPk(id)
      .then(
        (user) => {
          if (user) return done(null, user);
          return done(null, false);
        },
        (err) => done(err, false),
      );
  }));

  passport.use('github', new GitHubStrategy({
    clientID: process.env.OAUTH_GITHUB_CLIENT_ID,
    clientSecret: process.env.OAUTH_GITHUB_SECRET,
    callbackURL: '/api/auth/github/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    db.User.findOrCreate({
      where: {
        username: profile.username,
        salt: 'haha',
      },
    })
      .then(
        ([user]) => done(null, user),
        (err) => done(err, null),
      );
  }));
};

export default setupPassport;
