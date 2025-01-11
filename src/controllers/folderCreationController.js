const fs = require("node:fs");
const path = require("path");
const { addFolderToDb, firstFolder } = require("../db/queries");

const folderCreationController = async (req, res) => {
  const { folderName } = req.body;
  const user = req.user;
  const firstFolder1 = await firstFolder(user.id);
  const UPLOADS_DIR = path.join(__dirname, "../uploads");

  const userDirPath = path.join(UPLOADS_DIR, user.email, folderName);

  try {
    if (!fs.existsSync(userDirPath)) {
      fs.mkdirSync(userDirPath);
      await addFolderToDb(folderName, user.id, firstFolder1.id);
    }

    res.redirect("/userPage");
  } catch (err) {
    console.error(err);
  }
};

module.exports = folderCreationController;
