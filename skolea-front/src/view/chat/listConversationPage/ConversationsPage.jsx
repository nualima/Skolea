import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Card,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MessageService from "../../../services/messageServices";
import { UserContext } from "../../../context";
import dayjs from "dayjs"; // Utiliser dayjs pour le formatage de la date
import relativeTime from "dayjs/plugin/relativeTime"; // Plugin pour les temps relatifs

dayjs.extend(relativeTime);

function ConversationsPage() {
  const { userData } = useContext(UserContext);
  const userId = userData?.id;

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    MessageService.getConversationsByUserId(userId)
      .then((data) => {
        const formattedConversations = data.map((convo) => ({
          id: convo.lastMessageId,
          otherUserId: convo.otherUserId,
          otherUserName: convo.otherUserName,
          lastMessage: convo.lastMessageContent,
          lastMessageTimestamp: convo.lastMessageTimestamp,
        }));
        setConversations(formattedConversations);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching conversations:", error);
        setLoading(false);
      });
  }, [userId]);

  const handleSelectConversation = (conversation) => {
    navigate(`/conversation/${userId}/${conversation.otherUserId}`);
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Card elevation={4} sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ my: 2, mx: 2 }}>
        Conversations
      </Typography>
      <List>
        {conversations.length === 0 ? (
          <Typography sx={{ textAlign: "center", my: 2 }}>
            Aucune conversation trouvée.
          </Typography>
        ) : (
          conversations.map((conversation) => (
            <Box
              key={conversation.id}
              onClick={() => handleSelectConversation(conversation)}
              sx={{ cursor: "pointer" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>{conversation.otherUserName[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={conversation.otherUserName}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {conversation.lastMessage}
                      </Typography>
                      {" — "}
                      {dayjs(conversation.lastMessageTimestamp).fromNow()}
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </Box>
          ))
        )}
      </List>
    </Card>
  );
}

export default ConversationsPage;
