import Gym from "../models/Gyms.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  const { id } = req.params;

  const gym = await Gym.findById(id);

  const review = new Review(req.body.review);
  review.author = req.user.id;

  await review.save();

  gym.reviews.push(review._id);
  await gym.save();

  res.send({ review });
};

export const deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    return res.status(404).send({
      message: "Review not found",
    });
  }

  if (review.author.toString() !== req.user.id) {
    return res.status(403).send({
      message: "You are not allowed to delete this review",
    });
  }

  await Gym.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });

  await Review.findByIdAndDelete(reviewId);

  res.send({ success: true });
};