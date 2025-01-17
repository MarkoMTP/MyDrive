const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { findUserEmailWithId } = require("../db/queries");

// Ensure uploads directory exists
const UPLOAD_DIR = path.join(__dirname, "../uploads");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const { folderName, userId } = req.params;

    const user = await findUserEmailWithId(userId);

    const pathDir = path.join(UPLOAD_DIR, user.email, folderName);
    cb(null, pathDir); // Save files to the uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filenames
  },
});
const upload = multer({ storage });

module.exports = upload;
