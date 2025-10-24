import React from "react";
import { Box, Typography, Avatar, Paper, Divider } from "@mui/material";

const ChatRoomHeader = ({ selectedUser, users }) => {
  const userIndex = users.findIndex((u) => u.id === selectedUser.id);
  const avatarNumber = (userIndex % 10) + 1;

  return (
    <>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Avatar
            sx={{ bgcolor: "secondary.main", width: 56, height: 56 }}
            src={`/images/avatar/${avatarNumber}.png`}
          />
          <Box>
            <Typography variant="h6" color="text.primary">
              {selectedUser.attributes?.fullname ||
                selectedUser.attributes?.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{selectedUser.attributes?.username}
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Divider color="white" />
    </>
  );
};

export default ChatRoomHeader;
