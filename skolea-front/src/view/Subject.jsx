import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Card, Container } from "@mui/material";
import ExempleNavbar from '../components/ExempleNavbar';

// Liste des matières avec leurs identifiants, noms et couleurs
const subjects = [
    { id: 1, name: 'Mathématiques', color: '#FF5722' },
    { id: 2, name: 'Sciences', color: '#2196F3' },
    { id: 3, name: 'Histoire', color: '#9C27B0' },
    { id: 4, name: 'Géographie', color: '#4CAF50' },
    { id: 5, name: 'Langues', color: '#F44336' },
    { id: 6, name: 'Physique', color: '#673AB7' },
    { id: 7, name: 'Chimie', color: '#FFC107' },
    { id: 8, name: 'Biologie', color: '#795548' },
    { id: 9, name: 'Arts', color: '#607D8B' },
];

const Subject = () => {
    return (
        <div>
            {/* Affichage de la barre de navigation */}
            <ExempleNavbar />
            <Container>
                <Card style={{ padding: "25px" }}>
                    <h1>Liste des matières</h1>
                    {/* Affichage des boutons pour chaque matière */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {subjects.map((subject) => (
                            <Link to="/reservation" key={subject.id}>
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: subject.color, color: '#fff' }}
                                >
                                    {subject.name}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default Subject;
