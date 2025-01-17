const { findUserEmailWithId, findFile } = require("../db/queries");

const dowloadFileController = async (req, res) => {
  const { fileId, userId, folderName } = req.params;
  const user = await findUserEmailWithId(userId);
  const file = await findFile(Number(fileId));
  const path = file.path;

  try {
    res.download(path, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Download unsuccessful");
      }
      console.log("Download successful");
    });
  } catch (error) {
    console.error(error);
    res.set(500).send("Dowload unsuccessfull");
  }
};

module.exports = dowloadFileController;
