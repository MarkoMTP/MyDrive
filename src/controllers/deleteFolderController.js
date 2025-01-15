const fs = require("node:fs");
const path = require("path");
const { deleteFolder, getAllFilesFromFolder } = require("../db/queries");

const deleteFolderController = async (req, res) => {
  const { folderName, folderId } = req.body;
  const folderIdString = Number(folderId);
  const user = req.user;
  const files = await getAllFilesFromFolder(folderIdString);
  if (files && files.length > 0) {
    return res.redirect("/folderDeleteError");
  }

  const UPLOAD_DIR = path.join(__dirname, `../uploads/${user.email}`);

  const dir = path.join(UPLOAD_DIR, folderName);

  if (fs.existsSync(dir)) {
    fs.rmdir(dir, (err) => {
      if (err) {
        console.error("Error deleting folder:", err);
        return res
          .status(500)
          .send("Failed to delete folder from file system.");
      }
      console.log(`${dir} is deleted!`);
    });
  } else {
    console.warn(`Folder "${dir}" does not exist.`);
  }

  // Proceed with deleting the folder from the database
  try {
    await deleteFolder(folderName, folderIdString); // Make sure `deleteFolder` uses the correct field name
    res.redirect("/userPage");
  } catch (error) {
    console.error("Error deleting folder from database:", error);
    res.status(500).send("Failed to delete folder from database.");
  }
};

module.exports = { deleteFolderController };
