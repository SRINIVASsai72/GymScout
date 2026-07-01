import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Map from "../components/Map";

import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  TextField,
  Rating,
  Paper,
  Divider,
} from "@mui/material";

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [gym, setGym] = useState(null);
  const [review, setReview] = useState({
    rating: 5,
    body: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const isOwner = user && gym?.owner?._id === user.id;
  
  const averageRating = gym?.reviews?.length > 0 ? gym.reviews.reduce((sum, review) => sum + review.rating, 0) / gym.reviews.length  : 0;

  useEffect(() => {
    axios.get(`https://gymscout-ik2w.onrender.com/gyms/${id}`).then((res) => {
      setGym(res.data.gym);
    });
  }, [id]);

  const deleteGym = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`https://gymscout-ik2w.onrender.com/gyms/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/gyms");
    } catch (err) {
      const message =
        err.response?.data?.message || "You are not allowed to delete this gym";

      alert(message);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `https://gymscout-ik2w.onrender.com/gyms/${id}/reviews`,
        { review },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGym({
        ...gym,
        reviews: [...gym.reviews, res.data.review],
      });

      setReview({
        rating: 5,
        body: "",
      });
    } catch (err) {
      alert("Please login to add a review");
    }
  };

  if (!gym) return <h1>Loading...</h1>;

  const deleteReview = async (reviewId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://gymscout-ik2w.onrender.com/gyms/${id}/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGym({
        ...gym,
        reviews: gym.reviews.filter((review) => review._id !== reviewId),
      });
    } catch (err) {
      alert("You are not allowed to delete this review");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
      <Card elevation={5}>
        <CardMedia
          component="img"
          height="300"
          image={gym.image}
          alt={gym.title}
        />

        <CardContent>
          <Typography variant="h4" gutterBottom>
            {gym.title}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <Rating value={averageRating} precision={0.5} readOnly />

            <Typography color="text.secondary">
              {averageRating.toFixed(1)} ({gym.reviews?.length || 0} reviews)
            </Typography>
          </Stack>

          <Typography variant="h6" color="text.secondary">
            📍 {gym.location}
          </Typography>

          <Typography variant="h5" sx={{ mt: 2 }}>
            ₹{gym.price}
          </Typography>

          <Typography sx={{ mt: 2 }}>{gym.description}</Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            {isOwner && (
              <>
                <Button
                  variant="contained"
                  component={Link}
                  to={`/gyms/${id}/edit`}
                >
                  Edit
                </Button>

                <Button variant="contained" color="error" onClick={deleteGym}>
                  Delete
                </Button>
              </>
            )}

            <Button variant="outlined" component={Link} to="/gyms">
              Back
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Map gym={gym} />

      {user && (
        <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Leave a Review
          </Typography>

          <form onSubmit={submitReview}>
            <Stack spacing={2}>
              <Rating
                name="rating"
                value={review.rating}
                onChange={(e, newValue) => {
                  setReview({
                    ...review,
                    rating: newValue,
                  });
                }}
              />

              <TextField
                label="Review"
                value={review.body}
                onChange={(e) =>
                  setReview({
                    ...review,
                    body: e.target.value,
                  })
                }
                multiline
                rows={3}
                fullWidth
                required
              />

              <Button type="submit" variant="contained">
                Submit Review
              </Button>
            </Stack>
          </form>
        </Paper>
      )}

      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Reviews
        </Typography>

        {gym.reviews && gym.reviews.length > 0 ? (
          gym.reviews.map((review) => (
            <div key={review._id}>
              <Rating value={review.rating} readOnly />

              <Typography sx={{ mt: 1 }}>
                {review.body}
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 1 }}>
                — {review.author?.username || "User"}
              </Typography>

              {user && review.author?._id === user.id && (
                <Button
                  color="error"
                  onClick={() => deleteReview(review._id)}
                  sx={{ mt: 1 }}
                >
                  Delete Review
                </Button>
              )}

              <Divider sx={{ my: 2 }} />
            </div>
          ))
        ) : (
          <Typography color="text.secondary">No reviews yet.</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Show;