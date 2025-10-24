import React from "react";
import { Box, Typography } from "@mui/material";

const EmptyState = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "center",
        height: "85vh",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontSize: { xs: "1.2rem", md: "1.5rem" },
          maxWidth: "600px",
          px: 2,
        }}
      >
        Start
      </Typography>
      <Typography
        fontFamily={"Alfa Slab One, cursive"}
        sx={{
          fontSize: { xs: "1.5rem", md: "2rem" },
        }}
      >
        ChatZ
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontSize: { xs: "1.2rem", md: "1.5rem" },
          maxWidth: "600px",
          px: 2,
        }}
      >
        by selecting a friend from the list
      </Typography>
    </Box>
  );
};

export default EmptyState;
