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

async function moveImageToGallery(imageId, newGalleryId) {
  try {
    const existingImage = await prisma.image.findUnique({
      where: {
        id: parseInt(imageId, 10),
      },
    });

    if (!existingImage) {
      throw new Error(`Image with ID ${imageId} not found in the Image table.`);
    }

    const galleryImage = await prisma.galleryImage.create({
      data: {
        imageId: parseInt(imageId, 10),
        galleryId: parseInt(newGalleryId, 10),
      },
    });

    return galleryImage;
  } catch (error) {
    throw error;
  }
}

module.exports = { addImageToGallery, moveImageToGallery };
