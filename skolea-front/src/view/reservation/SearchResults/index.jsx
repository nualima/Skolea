import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
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
                    if (response && Array.isArray(response.data)) {
                        setResults(response.data);
                        if (response.data.length === 0) {
                            setError("Aucun professeur trouvé pour les critères spécifiés.");
                        }
                    } else {
                        // Gérer le cas où la structure de réponse n'est pas celle attendue
                        setError("Format de réponse inattendu.");
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching data: ", error);
                    setError("Erreur lors de la recherche de professeurs.");
                    setLoading(false);
                });
        }
    }, [subject, city]);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    return (
        <div>
            <h2>Résultats de Recherche</h2>
            {results.map((teacher) => (
                <Card key={teacher.id} style={{ margin: "10px" }}>
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
