const bycrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { findUserEmail, addUserToDb, addFolderToDb } = require("../db/queries"); // Adjust the path to your queries file
const fs = require("fs");
const path = require("path");

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
    const user = await findUserEmail(email);

    const userDirPath = path.join(__dirname, "../uploads", email);
    try {
      if (!fs.existsSync(userDirPath)) {
        fs.mkdirSync(userDirPath); // Ensure the directory exists
        await addFolderToDb(email, user.id); // Add root folder to DB with parentId null
      }
    } catch (fsError) {
      console.error("Error creating user directory:", fsError);
      return res.status(500).send("Error creating user folder.");
    }

    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registrating user");
  }
};

module.exports = registerController;
