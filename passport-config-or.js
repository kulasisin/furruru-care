const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    if (user == null) {
      console.log("no user with that email");
      return done(null, false, { messages: "no user with that email" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        console.log("ok");
        return done(null, user);
      } else {
        console.log("password incorrect");
        return done(null, false, { messages: "password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

module.exports = initialize;
