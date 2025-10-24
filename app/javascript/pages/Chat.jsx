import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Drawer, useTheme, useMediaQuery } from "@mui/material";
import ChatHeader from "../components/chat/ChatHeader";
import UserList from "../components/chat/UserList";
import EmptyState from "../components/chat/EmptyState";
import ChatRoom from "../components/chat/ChatRoom";

const Chat = ({ user }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(user);

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const drawerWidth = 280;

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

  useEffect(() => {
    fetchMessages();
    fetchUsers();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <ChatHeader user={user} onMenuClick={handleDrawerToggle} />

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
            <UserList
              users={users}
              selectedUser={selectedUser}
              onUserSelect={handleUserSelect}
              onLogout={handleLogout}
            />
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
            <UserList
              users={users}
              selectedUser={selectedUser}
              onUserSelect={handleUserSelect}
              onLogout={handleLogout}
            />
          </Drawer>

          {/* Main content area */}
          <Box
            sx={{
              ml: { md: 2 },
              width: "100%",
            }}
          >
            {selectedUser === user ? (
              <EmptyState />
            ) : (
              <ChatRoom
                selectedUser={selectedUser}
                users={users}
                messages={messages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                onSendMessage={sendMessage}
                loading={loading}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Chat;
