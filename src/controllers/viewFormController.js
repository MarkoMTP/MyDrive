const { findSpecificFolder } = require("../db/queries");

const viewFormController = async (req, res) => {
  const userId = req.params.userId;
  const folderName = req.params.folderName;
  try {
    const folder = await findSpecificFolder(userId, folderName);
    console.log(folder);

    res.render("folderInterface", {
      folder: folder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occured while loading folder");
  }
};

module.exports = viewFormController;
