const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const uploadImage = async (userId, url, title, description, category) => {
  return await prisma.image.create({
    data: {
      url,
      title,
      description,
      category,
      userId,
    },
  });
};

const getImages = async (category, keyword, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return await prisma.image.findMany({
    where: {
      AND: [
        { category: category || undefined },
        { title: { contains: keyword || "" } },
      ],
    },
    skip: parseInt(skip),
    take: parseInt(limit),
  });
};

const getImageById = async (id) => {
  return await prisma.image.findUnique({
    where: { id: parseInt(id) },
  });
};

const updateImage = async (id, data) => {
  try {
    const updatedImage = await prisma.image.update({
      where: { id: parseInt(id) },
      data,
    });
    return updatedImage;
  } catch (error) {
    if (error.code === "P2025") {
      console.error(`Image with id ${id} not found.`);
      throw new Error(`Image with id ${id} not found.`);
    } else {
      console.error(`Error updating image with id ${id}:`, error);
      throw new Error("Failed to update image.");
    }
  }
};

const deleteImage = async (id) => {
  try {
    const deletedImage = await prisma.image.delete({
      where: { id: parseInt(id) },
    });
    return deletedImage;
  } catch (error) {
    if (error.code === "P2025") {
      console.error(`Image with id ${id} not found.`);
      throw new Error(`Image with id ${id} not found.`);
    } else {
      console.error(`Error deleting image with id ${id}:`, error);
      throw new Error("Failed to delete image.");
    }
  }
};

module.exports = {
  uploadImage,
  getImages,
  getImageById,
  updateImage,
  deleteImage,
};
