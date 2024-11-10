const express = require("express");
const router = express.Router();
const galleryImageController = require("../controllers/galleryImageController");
const authenticate = require("../middlewares/authMiddlewares");
const upload = require("../utils/multer");

router.post(
  "/add-image",
  authenticate,
  upload.single("image"),
  galleryImageController.addImageToGallery
);
router.put(
  "/:imageId/move",
  galleryImageController.moveImageToGallery
);

module.exports = router;
