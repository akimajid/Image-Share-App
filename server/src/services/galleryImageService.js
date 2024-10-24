const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addImageToGallery = async (galleryId, url, title, description) => {
  return await prisma.galleryImage.create({
    data: {
      galleryId,
      url,
      title,
      description,
    },
  });
};

module.exports = { addImageToGallery };
