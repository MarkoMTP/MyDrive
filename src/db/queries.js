// Correct Prisma import
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addUserToDb = async function (email, password) {
  await prisma.user.create({
    data: {
      email,
      password,
    },
  });
};

const findUserEmail = async function (email) {
  const result = await prisma.user.findUnique({
    where: { email },
  });
  return result;
};

const addFolderToDb = async function (folderName, userId) {
  await prisma.folder.create({
    data: {
      name: folderName,
      userId: userId,
    },
  });
};

module.exports = {
  addUserToDb,
  findUserEmail,
  addFolderToDb,
};
