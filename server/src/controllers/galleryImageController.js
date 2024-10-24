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

const moveImageToGallery = async (req, res) => {
  const { newGalleryId } = req.body;
  const imageId = req.params.imageId; 

  console.log('Request Body:', req.body);

  console.log('Image ID from request:', imageId);
  console.log('New Gallery ID from request:', newGalleryId);

  try {
    const moveImage = await galleryImageService.moveImageToGallery(
      imageId,
      newGalleryId
    );
    res
      .status(200)
      .json({ message: "Move image to gallery successfuly", moveImage });
  } catch (error) {
    res.status(500).json({ message: "Error moving image to gallery", error });
  }
};

module.exports = { addImageToGallery, moveImageToGallery };
