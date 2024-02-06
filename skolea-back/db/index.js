const mysql = require('mysql2');

const connectionConfig = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'skolea'
};

const pool = mysql.createPool(connectionConfig);

const getUserByUsernameAndPassword = (username, password) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
        const params = [username, password];

        pool.query(query, params, (error, results) => {
            if (error) {
                console.error('Erreur lors de la recherche de l\'utilisateur :', error);
                reject(error);
            }

            if (results && results.length > 0) {
                resolve(results[0]);
            } else {
                resolve(null);
            }
        });
    });
};

const createUser = (username, password, firstname, lastname, birthday, email, phonenumber, statue, educationLevel) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO users (username, password, firstname, lastname, birthday, email, phonenumber, statue) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [username, password, firstname, lastname, birthday, email, phonenumber, statue, educationLevel];

        pool.query(query, params, (error, results) => {
            if (error) {
                console.error('Erreur lors de la création de l\'utilisateur :', error);
                reject(error);
            } else {
                console.log('Utilisateur créé avec succès');
                resolve();
            }
        });
    });
};

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE id = ?`;
        const params = [id];

        pool.query(query, params, (error, results) => {
            if (error) {
                console.error('Erreur lors de la recherche de l\'utilisateur :', error);
                reject(error);
            }

            if (results && results.length > 0) {
                resolve(results[0]);
            } else {
                resolve(null);
            }
        });
    });
};

const getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE username = ?`;
        const params = [username];

        pool.query(query, params, (error, results) => {
            if (error) {
                console.error('Erreur lors de la recherche de l\'utilisateur :', error);
                reject(error);
            }

            if (results && results.length > 0) {
                resolve(results[0]);
            } else {
                resolve(null);
            }
        });
    });
};

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE email = ?`;
        const params = [email];

        pool.query(query, params, (error, results) => {
            if (error) {
                console.error('Erreur lors de la recherche de l\'utilisateur :', error);
                reject(error);
            }

            if (results && results.length > 0) {
                resolve(results[0]);
            } else {
                resolve(null);
            }
        });
    });
};

const getUserByPhoneNumber = (phonenumber) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE phonenumber = ?`;
        const params = [phonenumber];

        pool.query(query, params, (error, results) => {
            if (error) {
                console.error('Erreur lors de la recherche de l\'utilisateur :', error);
                reject(error);
            }

            if (results && results.length > 0) {
                resolve(results[0]);
            } else {
                resolve(null);
            }
        });
    });
};

module.exports = {
    getUserByUsernameAndPassword,
    createUser,
    getUserByUsername,
    getUserByEmail,
    getUserByPhoneNumber,
    getUserById
};