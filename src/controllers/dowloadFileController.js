const { findUserEmailWithId, findFile } = require("../db/queries");

const https = require("https");

const downloadFileController = async (req, res) => {
  const { fileId, userId } = req.params;

  try {
    const user = await findUserEmailWithId(userId);
    const file = await findFile(Number(fileId));

    if (!file) {
      return res.status(404).send("File not found.");
    }

    const fileUrl = file.url; // Cloudinary URL stored in the database

    // Make a request to Cloudinary to fetch the file
    https
      .get(fileUrl, (response) => {
        if (response.statusCode !== 200) {
          return res
            .status(500)
            .send("Failed to fetch the file from Cloudinary.");
        }

        // Set headers for the download
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${file.filename}"`
        );
        res.setHeader("Content-Type", response.headers["content-type"]);

        // Pipe the Cloudinary file response directly to the client
        response.pipe(res);
      })
      .on("error", (err) => {
        console.error("Error fetching file:", err);
        res.status(500).send("Download unsuccessful");
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Download unsuccessful");
  }
};

module.exports = downloadFileController;
