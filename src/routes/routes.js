const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerFormController");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.get("/register", (req, res) => {
  res.render("registerForm");
});

router.post("/register", registerController);

module.exports = router;
