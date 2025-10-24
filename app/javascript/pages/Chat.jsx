import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Avatar,
  Divider,
  Container,
  IconButton,
} from "@mui/material";
import {
  Send as SendIcon,
  Person as PersonIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch messages from Rails API
  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/v1/messages");
      if (response.ok) {
        const data = await response.json();
        setMessages(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Send new message to Rails API
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('[name="csrf-token"]').content,
        },
        body: JSON.stringify({
          message: {
            content: newMessage,
            user_id: 1, // For demo purposes
          },
        }),
      });

      if (response.ok) {
        setNewMessage("");
        fetchMessages();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton component={Link} to="/" sx={{ mr: 2 }}>
            <ArrowBackIcon color="primary" />
          </IconButton>
          <Typography variant="h4" component="h1">
            Live Chat
          </Typography>
        </Box>

        {/* Messages List */}
        <Paper
          elevation={3}
          sx={{ height: 500, overflow: "auto", mb: 2, p: 2 }}
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

        {/* Message Input */}
        <Paper elevation={2} sx={{ p: 2 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              multiline
              maxRows={3}
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <Button
              variant="contained"
              onClick={sendMessage}
              disabled={loading || !newMessage.trim()}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Chat;
