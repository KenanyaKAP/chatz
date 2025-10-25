import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "./Layout";
import Home from "../pages/Home";
import Chat from "../pages/Chat";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FEDA3B",
    },
    secondary: {
      main: "#FD8834",
    },
    background: {
      default: "#0A0A0A",
      paper: "#1A1A1A",
      light: "#3a3a3aff",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
    error: {
      main: "#ff5b5bff",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const App = () => {
  const [selectedUser, setSelectedUser] = useState(() => {
    // Initialize from localStorage
    const savedUser = localStorage.getItem("selectedUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Handle selected user and save to localStorage
  const handleSetSelectedUser = (user) => {
    setSelectedUser(user);
    if (user) {
      localStorage.setItem("selectedUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("selectedUser");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* <Layout> */}
        <Routes>
          <Route
            path="/"
            element={<Home setSelectedUser={handleSetSelectedUser} />}
          />
          <Route path="/chat" element={<Chat user={selectedUser} />} />
        </Routes>
        {/* </Layout> */}
      </Router>
    </ThemeProvider>
  );
};

export default App;
