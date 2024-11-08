const galleryService = require("../services/galleryService");

const createGallery = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;

  try {
    const gallery = await galleryService.createGallery(userId, name);
    res.status(200).json({ message: "Create gallery succesfully", gallery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserGalleries = async (req, res) => {
  const userId = req.user.id;

  try {
    const galleries = await galleryService.getUSerGalleries(userId);
    res.status(200).json({ message: "Display all galleries", galleries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllGalleries = async (req, res) => {
  try {
    const galleries = await galleryService.getAllGalleries();
    res.status(200).json({ message: "Display all galleries", galleries });
  } catch (error) {
    res.status(500).json({ message: "Error fetching galleries" });
  }
};

const getGalleriesById = async (req, res) => {
  const galleryId = parseInt(req.params.galleryId, 10);

  if (isNaN(galleryId)) {
    return res.status(400).json({ message: "Invalid Gallery ID" });
  }

  try {
    const gallery = await galleryService.getGalleriesById(galleryId);
    if (gallery) {
      res
        .status(200)
        .json({ message: "Gallery retrieved successfully", gallery });
    } else {
      res.status(404).json({ message: "Gallery not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching gallery", error: error.message });
  }
};

const updateGalleryName = async (req, res) => {
  const { newName } = req.body;
  const { galleryId } = req.params;
  const userId = req.user.id;

  try {
    const updatedGallery = await galleryService.updateGalleryName(
      userId,
      galleryId,
      newName
    );
    res.status(200).json(updatedGallery);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteGallery = async (req, res) => {
  const galleryId = parseInt(req.params.galleryId, 10);
  const userId = req.user.id;

  try {
    await galleryService.deleteGallery(userId, galleryId);
    res.status(200).json({ message: "Delete gallery successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createGallery,
  getAllGalleries,
  getGalleriesById,
  updateGalleryName,
  deleteGallery,
};
