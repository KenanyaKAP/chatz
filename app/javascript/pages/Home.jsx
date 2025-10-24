import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  Stack,
} from "@mui/material";
import { Chat as ChatIcon, People as PeopleIcon } from "@mui/icons-material";

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Stack direction="row" spacing={2} justifyContent="center" mb={4}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            fontFamily={"Alfa Slab One, cursive"}
          >
            ChatZ
          </Typography>
        </Stack>

        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          color="text.secondary"
        >
          Your Rails 8 + React + Material UI Chat Application
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="body1" paragraph>
            This is a modern chat application built with:
          </Typography>
          <ul>
            <li>Ruby on Rails 8</li>
            <li>React 19 with Vite</li>
            <li>Material UI for beautiful components</li>
            <li>React Router for navigation</li>
          </ul>

          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Button
              component={Link}
              to="/chat"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ChatIcon />}
            >
              Go to Chat
            </Button>
            <Button
              component={Link}
              to="/users"
              variant="outlined"
              color="primary"
              size="large"
              startIcon={<PeopleIcon />}
            >
              View Users
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
