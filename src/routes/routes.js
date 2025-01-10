const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerFormController");
const { registerValidator } = require("../middleware/validators");
const passport = require("../authentication/passport");
const { loginFormController } = require("../controllers/loginController");
const folderCreationController = require("../controllers/folderCreationController");

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
    failureMessage: "Invalid email or password",
    successRedirect: "userPage",
  })
);

router.get("/userPage", loginFormController);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/createFolder", (req, res) => {
  res.render("createFolderForm");
});

router.post("/createFolder", folderCreationController);
module.exports = router;
