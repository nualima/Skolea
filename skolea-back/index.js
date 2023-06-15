const cors = require('cors')
const express = require("express")
var jwt = require('jsonwebtoken');

const api = require('./db')

const app = express()

// Mettre en place API
app.use(cors()) // Pour autoriser tout le monde à requêter le serveur !
app.use(express.json()) // body parser !
app.post('/login', async(req, res) => {
    const { username, password } = req.body;
    console.log(username, password)
    const userCollection = api.db.collection('user')
    const docs = await userCollection.findOne({ username, password })

    if (!docs) {
        return res.send({ success: false, message: 'Cet utilisateur n\'existe pas' })
    }

    const token = jwt.sign({ id: docs._id }, 'a1azek2kke11é5é55432a2')

    return res.send({ success: true, token })
})

app.post('/whoAmI', async(req, res) => {
    const { token } = req.body;

    const userInfo = jwt.decode(token) // Si pas d'erreur ça veut dire que le token est reocnnu et que donc il est valide !

    res.send({ success: true })
})

app.listen(8080)
console.log("Serveur démarré sur le port 8080")