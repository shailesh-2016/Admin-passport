const Admin = require("../model/admin.model");
const { hashToPlain } = require("../utils/password");
const localStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
  passport.use(
    new localStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        console.log(email);
        console.log(passport);
        const admin = await Admin.findOne({ email });
        if (!admin) {
          return done(null, false, console.log("user not found"));
        }
        const match = await hashToPlain(password , admin.password);
        if (!match) {
          return done(null, false, console.log("password not match"));
        }
        return done(null, admin);
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const admin = await Admin.findById(id);
      done(null, admin);
    } catch (error) {
      console.log(error);
      done(error, null);
    }
  });
};
