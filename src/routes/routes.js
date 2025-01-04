const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerFormController");
const { registerValidator } = require("../middleware/validators");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.get("/register", (req, res) => {
  res.render("registerForm");
});

router.post("/register", registerValidator, registerController);

module.exports = router;
