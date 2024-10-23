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

const getImageById = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await imageService.getImageById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateImage = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedImage = await imageService.updateImage(id, data);
    res.status(200).json({ message: "Update image successfull", updatedImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteImage = async (req, res) => {
  const { id } = req.params;
  try {
    await imageService.deleteImage(id);
    res
      .status(200)
      .json({ message: `Image with id ${id} has been successfully deleted.` });
  } catch (error) {
    if (error.message === `Image with id ${id} not found.`) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
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
