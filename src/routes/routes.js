const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerFormController");
const { registerValidator } = require("../middleware/validators");
const passport = require("../authentication/passport");
const { loginFormController } = require("../controllers/homepageController");

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/register", (req, res) => {
  res.render("registerForm");
});

router.post("/register", registerValidator, registerController);

router.get("/login", (req, res) => {
  res.render("loginForm");
});
router.post(
  "/login",
  passport.authenticate("user-login", {
    failureRedirect: "/login", // Redirect to login form
    failureMessage: "Invalid email or password", // Add optional flash message
  }),
  loginFormController
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
