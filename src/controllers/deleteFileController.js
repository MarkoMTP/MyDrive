const { findFile, deleteFileFromDb } = require("../db/queries");
const fs = require("node:fs");
const cloudinary = require("../../cloudinary");

const deleteFileController = async (req, res) => {
  const { fileId, folderName, fileName } = req.body;
  const file = await findFile(Number(fileId));
  const user = req.user;
  const userId = user.id;

  if (!file) {
    res.send("File Does Not Exist");
  }

  try {
    await deleteFileFromDb(Number(fileId));

    // Delete file from Cloudinary
    const publicId = file.publicId; // Assuming your DB stores the Cloudinary public_id
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
      console.log("File deleted from Cloudinary");
    }

    console.log("file deleted");
    res.redirect(`/userPage/${userId}/${folderName}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while deleting file");
  }
};

module.exports = { deleteFileController };
