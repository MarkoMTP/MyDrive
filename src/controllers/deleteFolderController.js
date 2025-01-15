const fs = require("node:fs");
const path = require("path");
const { deleteFolder, getAllFilesFromFolder } = require("../db/queries");
const { promisify } = require("util");

// Promisify fs.rmdir for cleaner async handling
const rmdirAsync = promisify(fs.rmdir);

const deleteFolderController = async (req, res) => {
  try {
    const { folderName, folderId } = req.body;
    const folderIdString = Number(folderId);
    const user = req.user;

    // Get files from the folder
    const files = await getAllFilesFromFolder(folderIdString);
    if (files && files.length > 0) {
      return res.redirect("/folderDeleteError");
    }

    const UPLOAD_DIR = path.join(__dirname, `../uploads/${user.email}`);
    const dir = path.join(UPLOAD_DIR, folderName);

    // Check if the directory exists and delete it
    if (fs.existsSync(dir)) {
      try {
        await rmdirAsync(dir); // Use promisified rmdir
        console.log(`${dir} is deleted!`);
      } catch (err) {
        console.error("Error deleting folder:", err);
        return res
          .status(500)
          .send("Failed to delete folder from file system.");
      }
    } else {
      console.warn(`Folder "${dir}" does not exist.`);
    }

    // Proceed with deleting the folder from the database
    await deleteFolder(folderName, folderIdString);
    res.redirect("/userPage");
  } catch (error) {
    console.error("Error in deleteFolderController:", error);
    res.status(500).send("An error occurred while deleting the folder.");
  }
};

module.exports = { deleteFolderController };
