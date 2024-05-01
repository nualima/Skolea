import React, { useState } from 'react';
import { Modal, Typography, Box, TextField, Button, Card, CardContent } from '@mui/material';

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
            <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '10px' }}>
    <Card raised>
        <CardContent>
            <Typography variant="h6" component="h2">
                {teacher.User.name} - {teacher.subjects}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
                Bio: {teacher.bio || "Aucune bio disponible"}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
                Prix: {teacher.price}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
                Ville: {teacher.Cities.map(city => city.cityName).join(", ")}
            </Typography>
        </CardContent>
    </Card>
    <Card raised sx={{ mt: 2 }}>
        <CardContent>
            <TextField
                fullWidth
                label="Votre message"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                margin="normal"
            />
            <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mt: 2 }}>
                Envoyer le message
            </Button>
        </CardContent>
    </Card>
</Box>

        </Modal>
    );
}

export default MessageModal;
