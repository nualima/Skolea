// import React from "react";
// import { Container, Grid, Typography } from "@mui/material";
// import { Card, CardBody } from "reactstrap";

// function ProfilePage() {
//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Typography variant="h4" sx={{ mb: 2 }}>
//         Mon Profil
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardBody>
//               <Typography variant="h6">Informations Personnelles</Typography>
//               <Typography sx={{ mt: 2 }}>
//                 Nom: <strong>Dupont</strong>
//               </Typography>
//               <Typography>
//                 Prénom: <strong>Jean</strong>
//               </Typography>
//               <Typography>
//                 Adresse e-mail: <strong>jean.dupont@mail.com</strong>
//               </Typography>
//             </CardBody>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardBody>
//               <Typography variant="h6">Historique de commande</Typography>
//               <Typography sx={{ mt: 2 }}>
//                 Vous n'avez aucune commande pour le moment.
//               </Typography>
//             </CardBody>
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

// export default ProfilePage;



import React from 'react';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import { Form, FormGroup, Input, Label, Navbar } from 'reactstrap';
import { Link } from 'react-router-dom';

import NavBar from '../components/NavBar';

// Un composant pour afficher les informations de base de l'utilisateur
const ProfileDetails = ({ user }) => {
  return (

    <Card>
      <CardHeader
        avatar={<Avatar src={user.avatar} />}
        title={user.name}
        subheader={user.email}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" color="text.secondary">
              Date de naissance
            </Typography>
            <Typography variant="body2" color="text.primary">
              {user.birthdate}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="text.secondary">
              Ville
            </Typography>
            <Typography variant="body2" color="text.primary">
              {user.city}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="text.secondary">
              Pays
            </Typography>
            <Typography variant="body2" color="text.primary">
              {user.country}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="text.secondary">
              Téléphone
            </Typography>
            <Typography variant="body2" color="text.primary">
              {user.phone}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary">
          Modifier le profil
        </Button>
      </CardActions>
    </Card>
  );
};

// Un composant pour afficher et modifier le mot de passe de l'utilisateur
const PasswordForm = () => {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Valider et changer le mot de passe
  };

  return (
    <Card>
      <CardContent>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="password">Nouveau mot de passe</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirmer le mot de passe</Label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit" color="primary">
            Changer le mot de passe
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};

// Le composant principal de la page de profil

const ProfileComponent = () => {
  // Simuler un utilisateur avec des données fictives
  const user = {
    name: 'Alice Dupont',
    email: 'alice.dupont@example.com',
    avatar: 'https://i.pravatar.cc/300',
    birthdate: '01/01/2000',
    city: 'Paris',
    country: 'France',
    phone: '+33 6 12 34 56 78',
  };

  return (
    <>  <NavBar />
      <Box sx={{ p: 4 }}>


        {/* <Link to="/profilePage" >revenir au début</Link> */}

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <ProfileDetails user={user} />
          </Grid>
          <Grid item xs={12} md={8}>
            <PasswordForm />
          </Grid>
        </Grid>
      </Box>
    </>

  );
};

export default ProfileComponent;