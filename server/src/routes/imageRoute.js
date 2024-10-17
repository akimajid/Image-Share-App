const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");
const authenticate = require("../middlewares/authMiddlewares");
const upload = require("../utils/multer");

router.post(
  "/upload",
  authenticate,
  upload.single("image"),
  imageController.uploadImage
);
router.get("/", imageController.getImages);

module.exports = router;
