const pool = require("./pool");

const addUserToDb = async function (email, password) {
  await pool.query("INSERT INTO user (email, password) VALUES ($1, $2) ", [
    email,
    password,
  ]);
};

module.exports = {
  addUserToDb,
};
