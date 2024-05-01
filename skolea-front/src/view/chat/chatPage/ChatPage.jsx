import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  Typography,
} from "@mui/material";
import MessageService from "../../../services/messageServices";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { userOneId, otherUserId } = useParams(); // Adjust parameter names if necessary
  console.log("ChatPage User IDs:", userOneId, otherUserId); // Verify parameter values

  useEffect(() => {
    if (userOneId && otherUserId) {
      // Fetch conversation only if both IDs are defined
      MessageService.getConversationBetweenTwoUsers(userOneId, otherUserId)
        .then(setMessages)
        .catch(console.error);
    }
  }, [userOneId, otherUserId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const message = await MessageService.createMessage(
          userOneId,
          otherUserId,
          newMessage
        ); // Assume your API requires both user IDs
        setMessages((prevMessages) => [...prevMessages, message]);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <Card>
      <Box sx={{ maxWidth: 500, margin: "auto", padding: 2 }}>
        {messages.length > 0 ? (
          <List>
            {messages.map((message, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={message.content}
                  secondary={`Sent at: ${message.timestamp}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography sx={{ textAlign: "center" }}>
            No messages in this conversation.
          </Typography>
        )}
        <Divider />
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 2 }}
        >
          <TextField
            label="Type your message"
            variant="outlined"
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default ChatPage;
