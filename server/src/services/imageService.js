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

module.exports = { uploadImage, getImages };
