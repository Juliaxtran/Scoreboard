import React, { useContext } from "react";
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
import { useMediaQuery } from "@mui/material";
import { Link, useParams} from "react-router-dom";
import { Context } from '../context/StateContext';
import axios from "axios";
import { useNavigate } from "react-router-dom";




function ResponsiveAppBar() {
  const { user , setUser, groupName} = useContext(Context);
  const { group_id } = useParams();
  const isMobile = useMediaQuery("(max-width:450px)");


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  let navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



  const logOut = (e) => {
    e.preventDefault();
    axios.post (
      "http://localhost:4000/player/logout", {withCredentials: true}
    ).then((res) => {
      console.log(res);
      setUser(null);
      const success = res.status === 200;
      if (success) navigate("/");
    }).catch((err) => {
      console.log(err);
    });
  }

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
            sx={{ flexGrow: 3, fontFamily: 'Fugaz One, cursive'}}
          >
            SCOREBOARD
          </Typography>
        </Link>
        {/* Navbar tile homepage */}
        {
          user && !isMobile ? (

            <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 4,
              fontFamily: "JetBrains Mono, monospace",
              textAlign: "center",
            }}
          >
            {group_id  ? `${groupName}` : `${user?.name} ${user?.lastname}`}
          </Typography>
          ) : (
            <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 4,
              fontFamily: "JetBrains Mono, monospace",
              textAlign: "center",
              color: "black"
            }}
          >
            Welcome to Scoreboard
          </Typography>
          )


        }

        {user ? (
          /* Mobile Responsive with Menu Icon  */
          <>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
                <Link to="/group" style={{ textDecoration: "none", color: 'black' }}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Groups</Typography>
                  </MenuItem>
                </Link>

                <Link to="#" style={{ textDecoration: "none", color: 'black' }} onClick={logOut}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </Box>

            {/* Desktop Responsive */}
            <Box
              sx={{ display: { xs: "none", md: "flex" } }}
              className="nav-bar-page"
            >
              <Link to="/group" style={{ textDecoration: "none" }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block", fontFamily: 'Fugaz One, cursive' , fontSize: '1rem'}}
                >
                  Groups
                </Button>
              </Link>
              <Link to="#" style={{ textDecoration: "none" }} onClick={logOut}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block", fontFamily: 'Fugaz One, cursive',  fontSize: '1rem' }}
                >
                  logout
                </Button>
              </Link>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{ display: { xs: "none", md: "flex" } }}
              className="nav-bar-page"
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block", fontFamily: 'Fugaz One, cursive', fontSize: '1rem'}}
                >
                 Join the game
                </Button>
              </Link>
              </Box>
          </>
        )}
      </Toolbar>
    </Container>
  </AppBar>

  );
}
export default ResponsiveAppBar;
