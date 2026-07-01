import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const Gyms = () => {
  const [gyms, setGyms] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [sort, setSort] = useState("");

  const fetchGyms = async () => {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (city) params.append("city", city);
  if (sort) params.append("sort", sort);

  const res = await axios.get(
    `http://localhost:3001/gyms?${params.toString()}`
  );

  setGyms(res.data.gyms);
};

  useEffect(() => {
    fetchGyms();
  }, []);

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        Explore Gyms
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Search gyms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>City</InputLabel>

          <Select
            value={city}
            label="City"
            onChange={(e) => setCity(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Hyderabad">Hyderabad</MenuItem>
            <MenuItem value="Bangalore">Bangalore</MenuItem>
            <MenuItem value="Mumbai">Mumbai</MenuItem>
            <MenuItem value="Delhi">Delhi</MenuItem>
            <MenuItem value="Chennai">Chennai</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Sort</InputLabel>

          <Select
            value={sort}
            label="Sort"
            onChange={(e) => setSort(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="price-low">Price: Low → High</MenuItem>
            <MenuItem value="price-high">Price: High → Low</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={fetchGyms}
        >
          Search
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            setSearch("");
            setCity("");
            setSort("");
            axios.get("http://localhost:3001/gyms").then((res) => {
              setGyms(res.data.gyms);
            });
          }}
        >
          Clear
        </Button>
      </Stack>

      <Grid container spacing={4}>
        {gyms.map((gym) => (
          <Grid item xs={12} sm={6} md={4} key={gym._id}>
            <Card
              sx={{
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 8,
                },
              }}
            >
              <CardMedia
                component="img"
                height="220"
                image={gym.image}
                alt={gym.title}
              />

              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  {gym.title}
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  📍 {gym.location}
                </Typography>

                <Typography variant="h6" sx={{ mt: 2 }}>
                  ₹{gym.price}
                </Typography>

                <Button
                  component={Link}
                  to={`/gyms/${gym._id}`}
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {gyms.length === 0 && (
        <Typography variant="h5" sx={{ mt: 5 }}>
          No gyms found.
        </Typography>
      )}
    </Container>
  );
};

export default Gyms;