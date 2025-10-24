import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Drawer,
  useTheme,
  useMediaQuery,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";
import {
  Send as SendIcon,
  Person as PersonIcon,
  ArrowBack as ArrowBackIcon,
  Menu as MenuIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

const Chat = ({ user }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [selectedUser, setSelectedUser] = useState(user);

  const drawerWidth = 280;

  // Function to get random avatar number (1-10)
  const getRandomAvatar = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

  // Redirect to home if no user is selected
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      setSelectedUser(user);
    }
  }, [user, navigate]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/v1/users");
      if (response.ok) {
        const data = await response.json();
        // Filter out current user
        const otherUsers = (data.data || []).filter((u) => u.id !== user?.id);
        setUsers(otherUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

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
    if (!newMessage.trim() || !user?.id) return;

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
            user_id: user.id,
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserSelect = (selectedUser) => {
    setSelectedUser(selectedUser);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    // Navigate back to home page
    navigate("/");
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 2, bgcolor: "background.paper", color: "white" }}>
        <Typography variant="h6">Friend Lists</Typography>
      </Box>
      <Divider color="white" />

      {/* Scrollable user list */}
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <List>
          {users.length === 0 ? (
            <ListItem>
              <ListItemText
                primary="No other users"
                secondary="You're the only one here!"
              />
            </ListItem>
          ) : (
            users.map((usr, index) => (
              <ListItemButton
                key={usr.id}
                selected={selectedUser?.id === usr.id}
                onClick={() => handleUserSelect(usr)}
                sx={{
                  "&.Mui-selected": {
                    bgcolor: "background.light",
                    "&:hover": {
                      bgcolor: "background.light",
                    },
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{ bgcolor: "secondary.main" }}
                    src={`/images/avatar/${(index % 10) + 1}.png`}
                  ></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={usr.attributes?.fullname || usr.attributes?.username}
                  secondary={`@${usr.attributes?.username}`}
                />
              </ListItemButton>
            ))
          )}
        </List>
      </Box>

      {/* Logout button at the bottom */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: "white" }}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{ py: 1.5 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  useEffect(() => {
    fetchMessages();
    fetchUsers();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          {isMobile && (
            <IconButton onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon color="primary" />
            </IconButton>
          )}
          {/* <IconButton component={Link} to="/" sx={{ mr: 2 }}>
            <ArrowBackIcon color="primary" />
          </IconButton> */}
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

        {/* Drawer for user list */}
        <Box sx={{ display: "flex" }}>
          {/* Mobile drawer (temporary) */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                height: "100vh",
              },
            }}
          >
            {drawer}
          </Drawer>

          {/* Desktop drawer (permanent) */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                position: "relative",
                height: "85vh",
              },
            }}
            open
          >
            {drawer}
          </Drawer>

          {/* Main content area */}
          <Box
            sx={{
              // display: "flex",
              // flexDirection: "column",
              // flexGrow: 1,
              ml: { md: 2 },
              width: "100%",
            }}
          >
            {selectedUser === user ? (
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
            ) : (
              // Chat Room
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  height: "85vh",
                }}
              >
                {/* Messages List */}
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
                                <Typography
                                  variant="subtitle2"
                                  color="text.primary"
                                >
                                  {message.attributes?.user_name ||
                                    `User ${message.attributes?.user_id}`}
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
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
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Chat;
