import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          GymScout
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Home
        </Button>

        <Button color="inherit" component={Link} to="/gyms">
          Gyms
        </Button>

        {user && (
        <Button color="inherit" component={Link} to="/gyms/new">
            Add Gym
        </Button>
        )}
        {!user ? (
          <>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>

            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </>
        ) : (
          <>
            <Typography sx={{ mx: 2 }}>
              {user.username}
            </Typography>

            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}