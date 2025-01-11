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

const addFolderToDb = async function (folderName, userId, parentId) {
  await prisma.folder.create({
    data: {
      name: folderName,
      userId: userId,
      parentId: parentId,
    },
  });
};

const getAllUserFolders = async function (parentFolderId, userId) {
  const folders = await prisma.folder.findMany({
    where: { parentId: parentFolderId, userId: userId },
  });
  return folders;
};

const firstFolder = async function (userId) {
  const result = await prisma.folder.findFirst({
    where: {
      userId: userId, // Replace 'userId' with the actual user ID
    },
    orderBy: {
      createdAt: "asc", // Sorting by creation date (ascending)
    },
  });

  return result;
};

const deleteFolder = async function (folderName, folderId) {
  await prisma.folder.delete({
    where: { name: folderName, id: folderId },
  });
};

module.exports = {
  addUserToDb,
  findUserEmail,
  addFolderToDb,
  getAllUserFolders,
  deleteFolder,
  firstFolder,
};
