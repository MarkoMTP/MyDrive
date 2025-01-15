const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerFormController");
const { registerValidator } = require("../middleware/validators");
const passport = require("../authentication/passport");
const upload = require("./upload");

// controllers
const viewFormController = require("../controllers/viewFormController");
const uploadFileController = require("../controllers/uploadFileController");
const { loginFormController } = require("../controllers/loginController");
const folderCreationController = require("../controllers/folderCreationController");
const {
  deleteFolderController,
} = require("../controllers/deleteFolderController");
const { findFile, findUserEmailWithId } = require("../db/queries");

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/register", (req, res) => {
  res.render("registerForm");
});

router.post("/register", registerValidator, registerController);

router.get("/login", (req, res) => {
  res.render("loginForm");
});
router.post(
  "/login",
  passport.authenticate("user-login", {
    failureRedirect: "/login", // Redirect to login form
    failureMessage: "Invalid email or password",
    successRedirect: "userPage",
  })
);

router.get("/userPage", loginFormController);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/createFolder", (req, res) => {
  res.render("createFolderForm");
});

router.post("/createFolder", folderCreationController);

router.post("/deleteFolder", deleteFolderController);

router.get("/userPage/:userId/:folderName", viewFormController);

// Upload route
router.post(
  "/userPage/:userId/:folderName",
  upload.single("file"),
  uploadFileController
);

router.get("/userPage/:userId/:folderName/:fileId", async (req, res) => {
  const fileId = Number(req.params.fileId);
  const { userId, folderName } = req.params;

  const file = await findFile(fileId);
  res.render("fileInterFace", {
    file: file,
    userId: userId,
    folderName: folderName,
  });
});

router.get(
  "/userPage/:userId/:folderName/:fileId/download",
  async (req, res) => {
    const { fileId, userId, folderName } = req.params;
    const user = await findUserEmailWithId(userId);
    const file = await findFile(Number(fileId));
    const path = file.path;
    console.log(path);

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
  }
);

router.get("/folderDeleteError", (req, res) => {
  res.render("folderDeleteError");
});

module.exports = router;
