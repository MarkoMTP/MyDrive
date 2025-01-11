const { getAllUserFolders, firstFolder } = require("../db/queries");

const loginFormController = async (req, res) => {
  const user = req.user;
  const firstFolder1 = await firstFolder(user.id);

  const folders = await getAllUserFolders(firstFolder1.id, user.id);
  console.log(folders);
  try {
    res.render("userPage", {
      user: req.user,
      folders: folders,
    });
  } catch (error) {
    console.error("Error fetching user", error);
    res.status(500).json({ error: "An error occurred while fetching." });
  }
};

module.exports = {
  loginFormController,
};
