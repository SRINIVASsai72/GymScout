import express from "express";
import {
  createReview,
  deleteReview,
} from "../controllers/reviewController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router.post("/", authMiddleware, createReview);
router.delete("/:reviewId", authMiddleware, deleteReview);

export default router;