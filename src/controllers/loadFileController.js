const { findFile } = require("../db/queries");

const loadFileController = async (req, res) => {
  const fileId = Number(req.params.fileId);
  const { userId, folderName } = req.params;

  const file = await findFile(fileId);
  res.render("fileInterFace", {
    file: file,
    userId: userId,
    folderName: folderName,
  });
};

module.exports = loadFileController;
