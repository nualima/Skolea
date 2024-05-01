import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import searchService from '../../../services/reservationService';
import MessageModal from '../../../components/messageModal';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const subject = searchParams.get("subject");
    const city = searchParams.get("city");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedTeacher, setSelectedTeacher] = useState(null);

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

    const handleOpenModal = (teacher) => {
        setSelectedTeacher(teacher);
    };

    const handleCloseModal = () => {
        setSelectedTeacher(null);
    };

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
                <Card key={teacher.id} style={{ margin: "10px", width: '100%' }} onClick={() => handleOpenModal(teacher)}>
                <CardContent>
                    <Typography variant="h5">{teacher.User.name}</Typography>
                    <Typography variant="body1">Sujets: {teacher.Subjects.map(subject => subject.name).join(", ")}</Typography>
                    <Typography variant="body2">Ville(s): {teacher.Cities.map(city => city.cityName).join(", ")}</Typography>
                </CardContent>
            </Card>
            
            ))}
            {selectedTeacher && (
                <MessageModal
                    open={!!selectedTeacher}
                    handleClose={handleCloseModal}
                    teacher={selectedTeacher}
                />
            )}
        </div>
    );
}

export default SearchResults;
