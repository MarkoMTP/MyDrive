const { findFile, deleteFileFromDb } = require("../db/queries");
const fs = require("node:fs");

const deleteFileController = async (req, res) => {
  const { fileId, folderName, fileName } = req.body;
  const file = await findFile(Number(fileId));
  const user = req.user;
  const userId = user.id;
  const filePath = file.path;

  if (!file) {
    res.send("File Does Not Exist");
  }

  try {
    await deleteFileFromDb(Number(fileId));
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error removing file: ${err}`);
        return;
      }

      console.log(`File ${filePath} has been successfully removed.`);
    });
    console.log("file deleted");
    res.redirect(`/userPage/${userId}/${folderName}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while deleting file");
  }
};

module.exports = { deleteFileController };
