import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import ChatBubble from "./ChatBubble";

const MessageList = ({ messages, currentUserId }) => {
  console.log("MessageList props:", { messages, currentUserId }); 
  return (
    <Paper
      elevation={3}
      sx={{
        flexGrow: 1,
        overflow: "auto",
        mb: 2,
        p: 2,
        minHeight: 0,
      }}
    >
      {messages.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            minHeight: "200px",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No messages yet. Start the conversation!
          </Typography>
        </Box>
      ) : (
        <Box>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message}
              isCurrentUser={message.attributes?.user_id == currentUserId}
            />
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default MessageList;
