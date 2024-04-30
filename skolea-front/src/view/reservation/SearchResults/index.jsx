import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import searchService from '../../../services/reservationService';  // Update this path if it's incorrect

function SearchResults() {
    const [searchParams] = useSearchParams();
    const subject = searchParams.get("subject");
    const city = searchParams.get("city");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (subject && city) {
            setLoading(true);
            setError("");
            searchService.searchTeachers(subject, city)
                .then(response => {
                    setLoading(false);
                    if (response.success) {
                        setResults(response.data);
                        if (response.data.length === 0) {
                            setError("Désolé, aucun professeur n'est disponible pour cette ville et/ou cette matière.");
                        }
                    } else {
                        setError("Désolé, aucun professeur n'est disponible pour cette ville et/ou cette matière.");
                    }
                })
                .catch(error => {
                    console.error("Error fetching data: ", error);
                    setError("Erreur lors de la recherche de professeurs.");
                    setLoading(false);
                });
        }
    }, [subject, city]);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) {
        return (
            <div className="mainContainer">
                <Card style={{ padding: "25px", width: '100%' }}>
                    <div className="titleContainer">
                        <Typography>{error}</Typography>
                    </div>
                    <br />
                    <div className="inputContainer">
                        <Button variant="contained" color="primary" component={Link} to="/">
                            Retour à l'accueil
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="mainContainer">
            <h2>Résultats de Recherche</h2>
            {results.map((teacher) => (
                <Card key={teacher.id} style={{ margin: "10px", width: '75%' }}>
                    <CardContent>
                        <Typography variant="h5">{teacher.name}</Typography>
                        <Typography variant="body1">{teacher.subject}</Typography>
                        <Typography variant="body2">{teacher.city}</Typography>
                        <Typography variant="body2">{teacher.bio}</Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default SearchResults;
