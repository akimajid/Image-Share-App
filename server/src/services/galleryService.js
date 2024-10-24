const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createGallery = async (userId, name, description) => {
  return await prisma.gallery.create({
    data: {
      name,
      userId,
    },
  });
};

const getAllGalleries = async () => {
  return await prisma.gallery.findMany({
    include: {
      images: true,
    },
  });
};

const getGalleriesById = async (userId) => {
  return await prisma.gallery.findMany({
    where: { userId },
    include: {
      images: true,
    },
  });
};

module.exports = { createGallery, getAllGalleries, getGalleriesById };
