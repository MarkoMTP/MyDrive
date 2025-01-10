const { getAllUserFolders } = require("../db/queries");

const loginFormController = async (req, res) => {
  const user = req.user;
  const folders = await getAllUserFolders(user.id);

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
