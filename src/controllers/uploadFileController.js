const { findSpecificFolder, addNewFileToDir } = require("../db/queries");

const uploadFileController = async (req, res) => {
  const { userId, folderName } = req.params;
  const folder = await findSpecificFolder(userId, folderName);

  if (req.file) {
    const { originalname, size, path: filePath } = req.file;

    await addNewFileToDir(originalname, size, folder.id, userId, filePath);
    res.redirect(`/userPage/${userId}/${folder.name}`);
  } else {
    return res.status(400).render("noFileUploadedErr", {
      errorMessage: "No file uploaded. Please select a file to upload.",
    });
  }
};

module.exports = uploadFileController;
