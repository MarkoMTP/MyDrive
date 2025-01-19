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

const findSpecificFolder = async function (userId, folderName) {
  const result = await prisma.folder.findFirst({
    where: {
      userId: userId,
      name: folderName,
    },
  });
  return result;
};

const addNewFileToDir = async function (
  filename,
  size,
  folderId,
  userId,
  secure_url,
  public_id,
  format
) {
  await prisma.file.create({
    data: {
      filename: filename,
      size: size,
      userId: userId,
      folderId: folderId,
      secure_url: secure_url,
      public_id: public_id,
      format: format,
    },
  });
};

const getAllFilesFromFolder = async function (folderId) {
  const result = await prisma.file.findMany({
    where: {
      folderId: folderId,
    },
  });
  return result;
};

const findFile = async function (fileId) {
  const result = await prisma.file.findFirst({
    where: {
      id: fileId, // Correct syntax: use a where clause
    },
  });
  return result;
};

const findUserEmailWithId = async function (id) {
  const result = await prisma.user.findFirst({
    where: { id: id },
  });
  return result;
};

const deleteFileFromDb = async function (fileId) {
  await prisma.file.delete({
    where: { id: fileId },
  });
};

module.exports = {
  addUserToDb,
  findUserEmail,
  addFolderToDb,
  getAllUserFolders,
  deleteFolder,
  firstFolder,
  findSpecificFolder,
  addNewFileToDir,
  getAllFilesFromFolder,
  findFile,
  findUserEmailWithId,
  deleteFileFromDb,
};
