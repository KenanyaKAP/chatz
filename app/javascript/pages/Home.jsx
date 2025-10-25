import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  Stack,
  Divider,
  Avatar,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const Home = ({ setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", fullname: "" });
  const [errors, setErrors] = useState({});

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

  // Function to handle Login
  const handleLogin = (user) => {
    setSelectedUser(user);
  };

  // Function to handle Delete
  const handleDelete = async (username) => {
    if (!confirm(`Are you sure you want to delete user @${username}?`)) {
      return;
    }

    try {
      const csrfToken = document.querySelector(
        'meta[name="csrf-token"]'
      )?.content;

      const response = await fetch(`/api/v1/users/${username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });

      if (response.ok) {
        // Refresh the users list after deletion
        fetchUsers();
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  };

  // Function to open the create user dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
    setErrors({});
    setNewUser({ username: "", fullname: "" });
  };

  // Function to close the create user dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setErrors({});
    setNewUser({ username: "", fullname: "" });
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Function to validate form
  const validateForm = () => {
    const newErrors = {};
    if (!newUser.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9_]+$/.test(newUser.username)) {
      newErrors.username =
        "Username can only contain letters, numbers, and underscores";
    }
    if (!newUser.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle Create User
  const handleCreateUser = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const csrfToken = document.querySelector(
        'meta[name="csrf-token"]'
      )?.content;

      const response = await fetch("/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ user: newUser }),
      });

      if (response.ok) {
        // Refresh the users list after creation
        fetchUsers();
        handleCloseDialog();
      } else {
        const data = await response.json();
        if (data.error) {
          // Handle Rails validation errors
          const railsErrors = {};
          Object.keys(data.error).forEach((key) => {
            railsErrors[key] = data.error[key].join(", ");
          });
          setErrors(railsErrors);
        } else {
          alert("Failed to create user");
        }
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 10, mx: 5 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            gap: 6,
          }}
        >
          <Typography
            variant="h3"
            component="h3"
            color="white"
            fontWeight={500}
            sx={{ alignSelf: "center" }}
          >
            Welcome to
          </Typography>
          <Box
            component="span"
            sx={{
              bgcolor: "primary.main",
              px: 5,
              py: 2,
              fontWeight: 600,
              borderRadius: "20px",
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              fontFamily={"Alfa Slab One, cursive"}
              color="black"
            >
              ChatZ
            </Typography>
          </Box>
        </Box>

        <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: "16px" }}>
          <Typography variant="h5" component="h5" gutterBottom>
            Select which user you want to login as to start chatting:
          </Typography>
          <Stack sx={{ mt: 5 }}>
            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            )}
            {users.map((user, index) => (
              // <>
              //   <Box key={user.id}>
              //     <Typography>{user.attributes?.fullname}</Typography>
              //   </Box>
              //   {index < users.length - 1 && <Divider color="white" />}
              // </>
              <Box key={user.id}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  {/* First Box */}
                  <Box
                    sx={{
                      display: "flex",
                      flexGrow: 1,
                      gap: 2,
                      width: { xs: "100%", sm: "auto" },
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "10px",
                      }}
                      // variant="rounded"
                      src={`/images/avatar/${(index % 10) + 1}.png`}
                    ></Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" component="h6">
                        {user.attributes?.fullname}
                      </Typography>
                      <Typography color="text.secondary">
                        @{user.attributes?.username}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Second Box */}
                  <Box
                    sx={{
                      alignSelf: "center",
                      display: "flex",
                      gap: 2,
                      flexDirection: { xs: "column", sm: "row" },
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        py: 1.3,
                        px: 5,
                        width: { xs: "100%", sm: "auto" },
                      }}
                      color="secondary"
                      component={Link}
                      to="/chat"
                      onClick={() => handleLogin(user)}
                    >
                      Login
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        py: 1.3,
                        px: 5,
                        width: { xs: "100%", sm: "auto" },
                      }}
                      color="error"
                      onClick={() => handleDelete(user.attributes?.username)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
                {index < users.length - 1 && (
                  <Divider color="white" sx={{ my: 2 }} />
                )}
              </Box>
            ))}
          </Stack>
          <Button
            disabled={loading}
            sx={{ mt: 5, p: 2 }}
            color="primary"
            onClick={handleOpenDialog}
          >
            Create new User
          </Button>
        </Paper>

        {/* Create User Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Create New User</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                autoFocus
                margin="dense"
                name="username"
                label="Username"
                type="text"
                fullWidth
                variant="outlined"
                value={newUser.username}
                onChange={handleInputChange}
                error={!!errors.username}
                helperText={errors.username}
                placeholder="e.g., johndoe"
              />
              <TextField
                margin="dense"
                name="fullname"
                label="Full Name"
                type="text"
                fullWidth
                variant="outlined"
                value={newUser.fullname}
                onChange={handleInputChange}
                error={!!errors.fullname}
                helperText={errors.fullname}
                placeholder="e.g., John Doe"
                sx={{ mt: 2 }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleCloseDialog} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={handleCreateUser}
              variant="contained"
              color="primary"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Home;
