import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Dialog,
  DialogContent,
  TextField,
  Button,
  Paper,
  Avatar,
} from "@mui/material";

const drawerWidth = 240;

const ChatPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const conversations = ["Conversation 1", "Conversation 2", "Conversation 3"];

  const messages = [
    { id: 1, text: "Hello, how are you?", sender: "John Doe" },
    { id: 2, text: "I'm good, thanks!", sender: "You" },
  ];

  const handleListItemClick = (conversation) => {
    setSelectedConversation(conversation);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Message sent:", event.target.message.value);
    setOpenDialog(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Typography variant="h6" noWrap component="div">
          Conversations
        </Typography>
        <Divider />
        <List>
          {conversations.map((conversation) => (
            <ListItem
              button
              key={conversation}
              onClick={() => handleListItemClick(conversation)}
            >
              <ListItemText primary={conversation} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Paper elevation={3} sx={{ maxHeight: "70vh", overflow: "auto", p: 2 }}>
          {messages.map((message, index) =>
            message.sender === "You" ? (
              <Box
                key={index}
                sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}
              >
                <Paper sx={{ bgcolor: "#f8e896", p: 1, borderRadius: 1 }}>
                  {message.text}
                </Paper>
              </Box>
            ) : (
              <Box key={index} sx={{ display: "flex", mb: 2 }}>
                <Avatar>{message.sender[0]}</Avatar>
                <Paper
                  sx={{ bgcolor: "#A8DDFD", p: 1, borderRadius: 1, ml: 2 }}
                >
                  {message.text}
                </Paper>
              </Box>
            )
          )}
        </Paper>
        <TextField
          autoFocus
          margin="dense"
          id="message"
          label="Votre message"
          type="text"
          fullWidth
          variant="outlined"
        />
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          sx={{ mt: 1 }}
        >
          Envoyer
        </Button>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          {/* Ici, vous pouvez ajouter du contenu au dialogue, comme un formulaire pour envoyer des messages */}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ChatPage;
