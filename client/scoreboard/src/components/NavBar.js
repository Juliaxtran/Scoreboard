import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { textAlign } from "@mui/system";

const pages = ["Groups", "Login", "Register"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    // Navbar Header
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* NavBar Title */}
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 3, fontFamily: "JetBrains Mono, monospace" }}
            >
              Scoreboard
            </Typography>
          </Link>
          {/* Navbar tile homepage */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 4,
              fontFamily: "JetBrains Mono, monospace",
              textAlign: "center",
            }}
          >
            Dashboard
          </Typography>

          {/* Mobile Responsive with Menu Icon  */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Link to="/groups" style={{ textDecoration: "none", color:'black' }}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Groups</Typography>
                </MenuItem>
              </Link>

              <Link to="/login" style={{ textDecoration: "none", color:'black' }}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              </Link>

              <Link to="/register" style={{ textDecoration: "none", color:'black' }}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Register</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>

          {/* Desktop Responsive */}
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            className="nav-bar-page"
          >
            <Link to="/groups" style={{ textDecoration: "none" }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Group
              </Button>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Login
              </Button>
            </Link>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Register
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
