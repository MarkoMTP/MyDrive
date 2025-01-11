const fs = require("node:fs");
const path = require("path");
const { addFolderToDb } = require("../db/queries");

const folderCreationController = async (req, res) => {
  const { folderName } = req.body;
  const user = req.user;
  const userDirPath = path.join(
    __dirname,
    `../uploads/${user.email}`,
    folderName
  );

  try {
    if (!fs.existsSync(userDirPath)) {
      fs.mkdirSync(userDirPath);
      await addFolderToDb(folderName, user.id);
    }

    res.redirect("/userPage");
  } catch (err) {
    console.error(err);
  }
};

module.exports = folderCreationController;
