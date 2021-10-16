import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import passport from "passport";
import { UserModel } from "../models/user.model.js";

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

async function createHash(password) {
  const salt = await bcrypt.hash(password, 10);
  return salt;
}

passport.use("login",new Strategy((username, password, done) => {
    UserModel.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (!isValidPassword(user, password)) return done(null, false);
      return done(null, user);
    });
  })
);

passport.use("signup",new Strategy({passReqToCallback: true},(req, username, password, done) => {
  UserModel.findOne({ username }, async (err, user) => {
    if (err) return done(err);
    if (user) return done(null, false);
    const hashPw = await createHash(password);
    const newUser = {
      username: req.body.username,
      password: hashPw,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    };

    UserModel.create(newUser, (err, user) => {
      if (err) return done(err);
      console.log("Usuario creado");
      return done(null, user);
    });
  });
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  UserModel.find({id}, done);
});

export default passport;
