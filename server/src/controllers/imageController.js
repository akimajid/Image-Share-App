const imageService = require("../services/imageService");

const uploadImage = async (req, res) => {
  const { title, description, category } = req.body;
  const url = `/uploads/${req.file.filename}`;
  const userId = req.user.id;

  try {
    const image = await imageService.uploadImage(
      userId,
      url,
      title,
      description,
      category
    );
    res.status(201).json({ image });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getImages = async (req, res) => {
  const { category, keyword, page, limit } = req.query;

  try {
    const images = await imageService.getImages(category, keyword, page, limit);
    res.json({ images });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadImage, getImages };
