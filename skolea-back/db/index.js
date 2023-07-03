const MongoClient = require('mongodb').MongoClient

let api = {
    db: null
};

async function connect() {
    const connectionString = "mongodb://127.0.0.1:27017";

    const client = new MongoClient(connectionString);

    let conn;
    try {
        conn = await client.connect();
    } catch (e) {
        console.log(e);
        throw e;
    }

    let db = conn.db("connexion")

    console.log("Connexion établie")

    api.db = db
}

connect()

module.exports = api