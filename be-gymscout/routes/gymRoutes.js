import express from "express";
import {
  index,
  showGym,
  createGym,
  updateGym,
  deleteGym,
} from "../controllers/gymController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { storage } from "../cloudinary/index.js";
import multer from "multer";

const upload = multer({ storage });

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createGym
);

router.delete("/:id", authMiddleware, deleteGym);

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateGym
);

router.get("/", index);
router.get("/:id", showGym);

export default router;