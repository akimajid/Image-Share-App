const galleryImageService = require("../services/galleryImageService");

const addImageToGallery = async (req, res) => {
  const { galleryId, title, description } = req.body;
  const url = `/uploads/${req.file.filename}`;

  try {
    const image = await galleryImageService.addImageToGallery(
      galleryId,
      url,
      title,
      description
    );
    res
      .status(200)
      .json({ message: "Add image to gallery successfuly", image });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addImageToGallery };
