import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const ChatBubble = ({ message, isCurrentUser }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isCurrentUser ? "flex-end" : "flex-start",
        mb: 1.5,
        px: 1,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          maxWidth: "70%",
          px: 2,
          py: 1,
          backgroundColor: isCurrentUser ? "primary.main" : "background.light",
          color: isCurrentUser ? "primary.contrastText" : "text.primary",
          borderRadius: isCurrentUser
            ? "18px 18px 4px 18px"
            : "18px 18px 18px 4px",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            wordWrap: "break-word",
            mb: 0.5,
          }}
        >
          {message.attributes?.content}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "right",
            opacity: 0.7,
            fontSize: "0.7rem",
          }}
        >
          {message.attributes?.time}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ChatBubble;
