const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { findUserEmail } = require("../db/queries");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

passport.use(
  "user-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await findUserEmail(username);
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (err) {
        console.error(err);
        return done(err);
      }
    }
  )
);

//serilize user, put him in session

passport.serializeUser((user, done) => {
  done(null, user.id);
});

//deserialize, or fetch the user data from db
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return done(new Error("User not found"));
    }

    done(null, user); // Attach user object to `req.user`
  } catch (err) {
    console.error(err);
    done(err, null); // Handle errors
  }
});
module.exports = passport;
