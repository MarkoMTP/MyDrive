const loginFormController = async (req, res) => {
  try {
    res.render("userPage", {
      user: req.user,
    });
  } catch (error) {
    console.error("Error fetching user", error);
    res.status(500).json({ error: "An error occurred while fetching." });
  }
};

module.exports = {
  loginFormController,
};
