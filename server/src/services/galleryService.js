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

const updateGalleryName = async (userId, galleryId, newName) => {
  const parsedGalleryId = parseInt(galleryId, 10);

  const existingGallery = await prisma.gallery.findFirst({
    where: {
      id: parsedGalleryId,
      userId,
    },
  });

  if (!existingGallery) {
    throw new Error(
      "Gallery not found or you do not have permission to update it."
    );
  }

  return await prisma.gallery.update({
    where: { id: parsedGalleryId },
    data: { name: newName },
  });
};

const deleteGallery = async (userId, galleryId) => {
  const existingGallery = await prisma.gallery.findFirst({
    where: {
      id: galleryId,
      userId,
    },
  });

  if (!existingGallery) {
    throw new Error(
      "Gallery not found or you do not have permission to delete it."
    );
  }

  return await prisma.gallery.delete({
    where: { id: galleryId },
  });
};

module.exports = {
  createGallery,
  getAllGalleries,
  getGalleriesById,
  updateGalleryName,
  deleteGallery,
};
