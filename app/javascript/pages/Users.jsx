import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Chip,
  CircularProgress,
  Divider,
} from "@mui/material";
import {
  Person as PersonIcon,
  ArrowBack as ArrowBackIcon,
  Message as MessageIcon,
} from "@mui/icons-material";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from Rails API
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/v1/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton component={Link} to="/" sx={{ mr: 2 }}>
            <ArrowBackIcon color="primary" />
          </IconButton>
          <Typography variant="h4" component="h1">
            Users
          </Typography>
        </Box>

        <Paper elevation={3}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : users.length === 0 ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="body1" color="text.secondary">
                No users found
              </Typography>
            </Box>
          ) : (
            <List>
              {users.map((user, index) => (
                <React.Fragment key={user.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        component={Link}
                        to="/chat"
                        color="primary"
                      >
                        <MessageIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "secondary.main" }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography variant="subtitle1">
                            {user.attributes?.fullname ||
                              user.attributes?.username}
                          </Typography>
                          <Chip
                            label="Online"
                            size="small"
                            color="success"
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={`@${user.attributes?.username}`}
                    />
                  </ListItem>
                  {index < users.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Users;
