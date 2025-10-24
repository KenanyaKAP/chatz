import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";

const UserList = ({ users, selectedUser, onUserSelect, onLogout }) => {
  return (
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
                onClick={() => onUserSelect(usr)}
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
                  />
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
          onClick={onLogout}
          sx={{ py: 1.5 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default UserList;
