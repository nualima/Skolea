import React, { useState } from 'react';
import { Modal, Typography, Box, TextField, Button } from '@mui/material';

function MessageModal({ open, handleClose, teacher }) {
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        console.log("Message sent: ", message);  // Remplacez cela par votre logique d'envoi de message
        handleClose(); // Ferme le modal après l'envoi
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {teacher.name} - {teacher.subjects}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Bio: {teacher.bio || "No bio available"}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Price: {teacher.price}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    City: {teacher.Cities.map(city => city.cityName).join(", ")}
                </Typography>
                <TextField
                    fullWidth
                    label="Votre message"
                    multiline
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    margin="normal"
                />
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Envoyer le message
                </Button>
            </Box>
        </Modal>
    );
}

export default MessageModal;
