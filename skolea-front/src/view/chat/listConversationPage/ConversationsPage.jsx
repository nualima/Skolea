import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MessageService from "../../../services/messageServices";
import { UserContext } from "../../../context";

function ConversationsPage() {
  const { userData } = useContext(UserContext); // Utilisez useContext pour accéder aux données de l'utilisateur
  const userId = userData?.id;

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Example of setting up conversations assuming you receive the correct data format
  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    MessageService.getConversationsByUserId(userId)
      .then((data) => {
        console.log("Fetched Conversations:", data); // Log to check structure
        const formattedConversations = data.map((convo) => ({
          id: convo.lastMessageId,
          otherUserId: convo.otherUserId, // l'ID de l'autre utilisateur dans la conversation
          lastMessage: convo.lastMessageContent,
          lastMessageTimestamp: convo.lastMessageTimestamp,
          userOneId: userId, // Assuring this is set as part of the conversation object
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
    console.log("Selected Conversation:", conversation); // Verify the IDs here
    navigate(
      `/conversation/${conversation.userOneId}/${conversation.otherUserId}`
    );
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <div>
      <Card>
        <Typography variant="h2">Conversations</Typography>
        {conversations.length === 0 ? (
          <Typography>Aucune conversation trouvée.</Typography>
        ) : (
          <List>
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation)}
              >
                <ListItem>
                  <ListItemText
                    primary={`Conversation with User ID: ${conversation.otherUserId}`}
                    secondary={`Last message at ${conversation.lastMessageTimestamp}: ${conversation.lastMessage}`}
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        )}
      </Card>
    </div>
  );
}

export default ConversationsPage;
