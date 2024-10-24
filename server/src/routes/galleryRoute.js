const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const authenticate = require("../middlewares/authMiddlewares");

router.post("/create", authenticate, galleryController.createGallery);
router.get("/", galleryController.getAllGalleries);
router.get("/:id", galleryController.getGalleriesById);

module.exports = router;
