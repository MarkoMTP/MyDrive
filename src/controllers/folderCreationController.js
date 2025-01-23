const fs = require("node:fs");
const path = require("path");
const { addFolderToDb, firstFolder } = require("../db/queries");

const folderCreationController = async (req, res) => {
  const { folderName } = req.body;
  const user = req.user;
  const firstFolder1 = await firstFolder(user.id);

  try {
    await addFolderToDb(folderName, user.id, firstFolder1.id);

    res.redirect("/userPage");
  } catch (err) {
    console.error(err);
  }
};

module.exports = folderCreationController;
