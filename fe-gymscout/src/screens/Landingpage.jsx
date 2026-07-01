import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";

const LandingPage = () => {
  return (
    <Box
      sx={{
        minHeight: "90vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            backgroundColor: "rgba(0,0,0,0.6)",
            p: 5,
            borderRadius: 3,
            color: "white",
          }}
        >
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Find Your Perfect Gym
          </Typography>

          <Typography variant="h6" sx={{ mb: 4 }}>
            Discover gyms near you, compare prices, and start your fitness
            journey with GymScout.
          </Typography>

          <Button
            component={Link}
            to="/gyms"
            variant="contained"
            size="large"
          >
            Explore Gyms
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;