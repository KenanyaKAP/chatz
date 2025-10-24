import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";

const MessageList = ({ messages }) => {
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
      <List>
        {messages.length === 0 ? (
          <ListItem>
            <ListItemText
              primary="No messages yet"
              secondary="Start the conversation!"
            />
          </ListItem>
        ) : (
          messages.map((message) => (
            <div key={message.id}>
              <ListItem alignItems="flex-start">
                <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
                  <PersonIcon />
                </Avatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" color="text.primary">
                      {message.attributes?.user_name ||
                        `User ${message.attributes?.user_id}`}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {message.attributes?.content}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))
        )}
      </List>
    </Paper>
  );
};

export default MessageList;
