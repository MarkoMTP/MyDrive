const { findSpecificFolder, getAllFilesFromFolder } = require("../db/queries");

const viewFormController = async (req, res) => {
  const userId = req.params.userId;
  const folderName = req.params.folderName;
  const folder = await findSpecificFolder(userId, folderName);

  const files = await getAllFilesFromFolder(folder.id);
  try {
    console.log(folder);

    res.render("folderInterface", {
      folder: folder,
      userId: userId,
      files: files,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occured while loading folder");
  }
};

module.exports = viewFormController;
