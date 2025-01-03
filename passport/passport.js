const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bycrypt = require("bycrypt");
const pool = require("../db/pool");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        username,
      ]);
      if (result.rows.length === 0) {
        return done(null, false, { message: "Incorrect email." });
      }

      const user = result.rows[0];

      const isMatch = await bycrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (err) {
      console.error(err);
      return done(err);
    }
  })
);

//serilize user, put him in session

passport.serializeUser((user, done) => {
  done(null, user.id);
});

//deserialize, or fetch the user data from db
passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return done(new Error("User not found"));
    }

    const user = result.rows[0];
    done(null, user); // Attach user object to `req.user`
  } catch (err) {
    console.error(err);
    done(err, null); // Handle errors
  }
});
module.exports = passport;
