import React from "react";
import { Box } from "@mui/material";
import ChatRoomHeader from "./ChatRoomHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatRoom = ({
  selectedUser,
  users,
  messages,
  newMessage,
  setNewMessage,
  onSendMessage,
  loading,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        height: "85vh",
      }}
    >
      <ChatRoomHeader selectedUser={selectedUser} users={users} />
      <MessageList messages={messages} />
      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        onSend={onSendMessage}
        loading={loading}
      />
    </Box>
  );
};

export default ChatRoom;
