const { findSpecificFolder, addNewFileToDir } = require("../db/queries");

const uploadFileController = async (req, res) => {
  const { userId, folderName } = req.params;
  const folder = await findSpecificFolder(userId, folderName);

  if (req.file) {
    const { originalname, size, path: filePath } = req.file;

    await addNewFileToDir(originalname, size, folder.id, userId, filePath);
    res.status(200).json({
      message: "File uploaded successfully",
      file: req.file,
    });
  } else {
    res.status(400).json({ message: "No file uploaded" });
  }
};

module.exports = uploadFileController;
