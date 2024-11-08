const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const authenticate = require("../middlewares/authMiddlewares");

router.post("/create", authenticate, galleryController.createGallery);
router.get("/", galleryController.getAllGalleries);
router.get("/:galleryId", galleryController.getGalleriesById);
router.put("/:galleryId", authenticate, galleryController.updateGalleryName);
router.delete("/:galleryId", authenticate, galleryController.deleteGallery);

module.exports = router;
