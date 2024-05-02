import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  Typography,
  Paper,
  Divider,
  Card,
} from "@mui/material";
import { styled } from "@mui/system";
import MessageService from "../../../services/messageServices";
import { UserContext } from "../../../context";

const StyledListItem = styled(ListItem)(({ theme, owner }) => ({
  justifyContent: owner ? "flex-end" : "flex-start",
  padding: theme.spacing(1),
}));

const MessageBubble = styled(Paper)(({ theme, owner }) => ({
  maxWidth: "70%",
  padding: theme.spacing(1),
  backgroundColor: owner ? "#e0f7fa" : "#f0f0f0",
  borderRadius: "10px",
  border: owner ? "1px solid #b2ebf2" : "1px solid #e0e0e0",
}));

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { userOneId, otherUserId } = useParams();
  const { userData } = useContext(UserContext);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (userOneId && otherUserId) {
      MessageService.getConversationBetweenTwoUsers(userOneId, otherUserId)
        .then((response) => {
          const formattedMessages = response.map((msg) => ({
            ...msg,
            owner: msg.senderId === userData.id,
          }));
          setMessages(formattedMessages);
        })
        .catch(console.error);
    }
  }, [userOneId, otherUserId, userData.id]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const message = await MessageService.createMessage(
          userData.id,
          otherUserId,
          newMessage
        );
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...message, owner: true },
        ]);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <Card>
      <Box sx={{ maxWidth: 500, margin: "auto", padding: 2 }}>
        <List>
          {messages.map((message, index) => (
            <StyledListItem key={index} owner={message.owner}>
              <MessageBubble owner={message.owner}>
                <Typography variant="body1">{message.content}</Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    textAlign: "right",
                    color: "text.secondary",
                  }}
                >
                  {new Date(message.timestamp).toLocaleTimeString()}
                </Typography>
              </MessageBubble>
            </StyledListItem>
          ))}
          {/* Element for scrolling into view */}
          <div ref={endOfMessagesRef} />
        </List>
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
            label="Type your message here..."
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
