import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "./Layout";
import Home from "../pages/Home";
import Chat from "../pages/Chat";
import Users from "../pages/Users";

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* <Layout>
          
        </Layout> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
