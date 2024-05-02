import React, { useState, useContext } from "react";
import {
  Modal,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import MessageService from "../../services/messageServices";
import { UserContext } from "../../context";

function MessageModal({ open, handleClose, teacher }) {
  const [message, setMessage] = useState("");
  const { userData } = useContext(UserContext); // Access user context

  const handleSubmit = async () => {
    if (message.trim() === "") return; // Prevent sending empty messages

    try {
      // Assume userData.id is the senderId and teacher.userId is the receiverId
      await MessageService.sendMessage(userData.id, teacher.userId, message);
      console.log("Message sent to:", teacher.User.name);
      handleClose(); // Close the modal after sending the message
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
        }}
      >
        <Card raised>
          <CardContent>
            <Typography variant="h6" component="h2">
              {teacher.User.name} - {teacher.subjects}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Bio: {teacher.bio || "No bio available"}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Price: {teacher.price}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              City: {teacher.Cities.map((city) => city.cityName).join(", ")}
            </Typography>
          </CardContent>
        </Card>
        <Card raised sx={{ mt: 2 }}>
          <CardContent>
            <TextField
              fullWidth
              label="Your Message"
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              margin="normal"
            />
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Send Message
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
}

export default MessageModal;
