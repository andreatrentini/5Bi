const express = require('express');
const config = require('./config.js');
const mysql = require('mysql');
const auth = require('./authservice.js');

const router = express.Router();

router.get('', (request, response) => {
    // Stabilire la connessione con mysql server
    let mysqlconn = mysql.createConnection(config.dbConfig);

    // Definire l'istruzione SQL da eseguire
    let sqlString = 'SELECT * FROM Jobs';

    // Eseguire l'istruzione SQL sulla connessione
    mysqlconn.query(sqlString, (error, data) => {
        if (!error) {
            response.json(data);
        }
        else {
            response.status(500).send(error);
        }
    })
});

router.get('/:id', (request, response) => {
    let id = request.params.id;
    // Stabilire la connessione con mysql server
    let mysqlconn = mysql.createConnection(config.dbConfig);

    // Definire l'istruzione SQL da eseguire
    let sqlString = 'SELECT * FROM Jobs WHERE id = ?';

    // Eseguire l'istruzione SQL sulla connessione
    mysqlconn.query(sqlString, id, (error, data) => {
        if (!error) {
            response.json(data);
        }
        else {
            response.status(500).send(error);
        }
    })
});

router.get('/name/:name', (request, response) => {
    let name = request.params.name;
    // Stabilire la connessione con mysql server
    let mysqlconn = mysql.createConnection(config.dbConfig);

    // Definire l'istruzione SQL da eseguire
    let sqlString = 'SELECT * FROM Jobs WHERE name LIKE ?';

    // Eseguire l'istruzione SQL sulla connessione
    mysqlconn.query(sqlString, name, (error, data) => {
        if (!error) {
            response.json(data);
        }
        else {
            response.status(500).send(error);
        }
    })
});

router.delete('/:id', auth, (request, response) => {
    let id = request.params.id;

    let mysqlconn = mysql.createConnection(config.dbConfig);

    // Definire l'istruzione SQL da eseguire
    let sqlString = 'DELETE FROM Jobs WHERE id = ?';

    // Eseguire l'istruzione SQL sulla connessione
    mysqlconn.query(sqlString, id, (error, data) => {
        if (!error) {
            response.json(data);
        }
        else {
            response.status(500).send(error);
        }
    })
});

router.post('/:id', auth, (request, response) => {
    let id = request.params.id;
    let dati = request.body;

    let mysqlconn = mysql.createConnection(config.dbConfig);

    let params = [id, dati.name, dati.description, dati.completed, dati.userId];
    let sqlString = "INSERT INTO Jobs VALUES(?, ?, ?, ?, ?);";

    mysqlconn.query(sqlString, params, (error, data) => {
        if (!error) {
            response.json(data);
        }
        else {
            response.status(500).send(error);
        }
    })
})

router.put('/:id', auth, (request, response) => {
    let id = request.params.id;
    let dati = request.body;

    let mysqlconn = mysql.createConnection(config.dbConfig);

    let params = [dati.first_name, dati.last_name, dati.email, dati.gender, dati.ip_address, id];
    let sqlString = "UPDATE Users SET first_name = ?, last_name = ?, email = ?, gender = ?, ip_address = ? WHERE id = ?;";

    mysqlconn.query(sqlString, params, (error, data) => {
        if (!error) {
            response.json(data);
        }
        else {
            response.status(500).send(error);
        }
    })
})

module.exports = router;

