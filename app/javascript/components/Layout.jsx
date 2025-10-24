import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import {
  Home as HomeIcon,
  Chat as ChatIcon,
  People as PeopleIcon,
} from "@mui/icons-material";

const Layout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chatz
          </Typography>
          <Button
            component={Link}
            to="/"
            color="inherit"
            startIcon={<HomeIcon />}
            sx={{
              bgcolor: isActive("/")
                ? "rgba(255, 255, 255, 0.1)"
                : "transparent",
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/chat"
            color="inherit"
            startIcon={<ChatIcon />}
            sx={{
              bgcolor: isActive("/chat")
                ? "rgba(255, 255, 255, 0.1)"
                : "transparent",
            }}
          >
            Chat
          </Button>
          <Button
            component={Link}
            to="/users"
            color="inherit"
            startIcon={<PeopleIcon />}
            sx={{
              bgcolor: isActive("/users")
                ? "rgba(255, 255, 255, 0.1)"
                : "transparent",
            }}
          >
            Users
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            Built with Rails 8 + React + Material UI + Vite
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
