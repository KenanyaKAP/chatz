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
} from "@mui/material";
import {
  Person as PersonIcon,
  ArrowBack as ArrowBackIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import { Chat as ChatIcon, People as PeopleIcon } from "@mui/icons-material";

const Home = ({ setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to get random avatar number (1-10)
  const getRandomAvatar = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

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
              borderRadius: 1,
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
                      src={`/images/avatar/${getRandomAvatar()}.png`}
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
                      component={Link}
                      to="/chat"
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
          <Button disabled={loading} sx={{ mt: 5, p: 2 }}>
            Create new User
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
