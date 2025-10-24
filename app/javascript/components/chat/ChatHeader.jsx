import React from "react";
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const ChatHeader = ({ user, onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
      {isMobile && (
        <IconButton onClick={onMenuClick} sx={{ mr: 2 }}>
          <MenuIcon color="primary" />
        </IconButton>
      )}
      <Typography variant="h5" color="text.secondary">
        @{user?.attributes?.username}
      </Typography>
      <Typography
        variant="h4"
        component="h1"
        fontFamily={"Alfa Slab One, cursive"}
        color="primary"
        sx={{ mx: "auto", fontSize: { xs: "2rem", md: "2.5rem" } }}
      >
        ChatZ
      </Typography>
    </Box>
  );
};

export default ChatHeader;
