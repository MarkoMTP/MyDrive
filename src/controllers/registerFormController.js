const bycrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { findUserEmail, addUserToDb } = require("../db/queries"); // Adjust the path to your queries file

const registerController = async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // check if email is already registered
  try {
    const result = await findUserEmail(email);
    if (result) {
      return res.status(400).send("Email already in use");
    }

    //hash the password and add to db
    const hashedPassword = await bycrypt.hash(password, 10);
    await addUserToDb(email, hashedPassword);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registrating user");
  }
};

module.exports = registerController;
