import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
} from "@mui/material";

export default function New() {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const [gym, setGym] = useState({
    title: "",
    location: "",
    price: "",
    lat: "",
    lng: "",
    description: "",
  });

  const handleChange = (e) => {
    setGym({
      ...gym,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("gym[title]", gym.title);
    formData.append("gym[location]", gym.location);
    formData.append("gym[price]", gym.price);
    formData.append("gym[lat]", gym.lat);
    formData.append("gym[lng]", gym.lng);
    formData.append("gym[description]", gym.description);

    if (image) {
      formData.append("image", image);
    }

    const token = localStorage.getItem("token");

    const res = await axios.post("http://localhost:3001/gyms", formData, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    });

    navigate(`/gyms/${res.data.gym._id}`);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Gym
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Gym Title"
              name="title"
              value={gym.title}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Location"
              name="location"
              value={gym.location}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Price"
              name="price"
              type="number"
              value={gym.price}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Latitude"
              name="lat"
              type="number"
              value={gym.lat}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Longitude"
              name="lng"
              type="number"
              value={gym.lng}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Description"
              name="description"
              value={gym.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              required
            />

            <Button variant="outlined" component="label">
              Upload Gym Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Button>

            <Button type="submit" variant="contained" size="large">
              Add Gym
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}