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
  const userId = req.user?.id;
  try {
    const galleries = await galleryService.getGalleriesById(userId);
    res.status(200).json({ message: "Display gallery successful", galleries });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user galleries" });
  }
};

module.exports = {
  createGallery,
  getUserGalleries,
  getAllGalleries,
  getGalleriesById,
};
