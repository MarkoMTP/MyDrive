const { findSpecificFolder, addNewFileToDir } = require("../db/queries");
const cloudinary = require("../../cloudinary");

const uploadFileController = async (req, res) => {
  if (!req.file) {
    return res.render("noFileUploadedErr");
  }

  const file = req.file;

  try {
    // upload to cloudinary

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto", // Automatically detect file type (image, video, etc.)
    });

    const { secure_url, public_id, format } = cloudinaryResponse;

    // Save file metadata to the database
    await addNewFileToDir(
      file.name, // Original file name
      file.size, // File size
      folderId, // Folder foreign key
      userId, // User foreign key
      secure_url,
      public_id,
      format
    );

    res.status(200).send("File uploaded successfully!");
  } catch (err) {
    console.error(error);
    res.status(500).send("Error uploading file.");
  }
};

module.exports = uploadFileController;
