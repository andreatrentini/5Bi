const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config.js');
const auth = require('./authservice.js');

var service = express();

service.use(cors());
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({ extended: false }));

service.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});


service.post('/login', (request, response) => {
    let username = request.body.username;
    let password = request.body.password;

    let mysqlconn = mysql.createConnection(config.dbConfig);

    let sqlString = "SELECT * FROM Admins WHERE username = ? AND pwd = ?;";
    let params = [username, password];

    mysqlconn.query(sqlString, params, (error, data) => {
        if (!error) {
            if (data.length > 0) {
                let token = jwt.sign({
                    nome: data[0].nome,
                    cognome: data[0].cognome
                }, config.passPhrase, { expiresIn: config.tokenDuration })
                response.json(token);
            }
            else {
                response.status(401).send('Bad username or password.');
            }
        }
        else {
            response.status(500).send(error);
        }
    })


})

service.get('/users', (request, response) => {
    // Stabilire la connessione con mysql server
    let mysqlconn = mysql.createConnection(config.dbConfig);

    // Definire l'istruzione SQL da eseguire
    let sqlString = 'SELECT * FROM Users';

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

service.get('/users/:id', (request, response) => {
    let id = request.params.id;
    // Stabilire la connessione con mysql server
    let mysqlconn = mysql.createConnection(config.dbConfig);

    // Definire l'istruzione SQL da eseguire
    let sqlString = 'SELECT * FROM Users WHERE id = ?';

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

service.get('/users/gender/:gender', (request, response) => {
    let gender = request.params.gender;
    // Stabilire la connessione con mysql server
    let mysqlconn = mysql.createConnection(config.dbConfig);

    // Definire l'istruzione SQL da eseguire
    let sqlString = 'SELECT * FROM Users WHERE gender LIKE ?';

    // Eseguire l'istruzione SQL sulla connessione
    mysqlconn.query(sqlString, gender, (error, data) => {
        if (!error) {
            response.json(data);
        }
        else {
            response.status(500).send(error);
        }
    })
});

service.get('/users/firstname/:firstName/lastname/:lastName', (request, response) => {
    let firstName = request.params.firstName;
    let lastName = request.params.lastName;
    // Stabilire la connessione con mysql server
    let mysqlconn = mysql.createConnection(config.dbConfig);

    // Definire l'istruzione SQL da eseguire
    let sqlString = 'SELECT * FROM Users WHERE first_name LIKE ? AND last_name LIKE ?';

    // Eseguire l'istruzione SQL sulla connessione
    mysqlconn.query(sqlString, [firstName, lastName], (error, data) => {
        if (!error) {
            response.json(data);
        }
        else {
            response.status(500).send(error);
        }
    })
});

service.delete('/users/:id', auth, (request, response) => {
    let id = request.params.id;

    let mysqlconn = mysql.createConnection(config.dbConfig);

    // Definire l'istruzione SQL da eseguire
    let sqlString = 'DELETE FROM Users WHERE id = ?';

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

service.post('/users/:id', auth, (request, response) => {
    let id = request.params.id;
    let dati = request.body;

    let mysqlconn = mysql.createConnection(config.dbConfig);

    let params = [id, dati.first_name, dati.last_name, dati.email, dati.gender, dati.ip_address];
    let sqlString = "INSERT INTO Users VALUES(?, ?, ?, ?, ?, ?);";

    mysqlconn.query(sqlString, params, (error, data) => {
        if (!error) {
            response.json(data);
        }
        else {
            response.status(500).send(error);
        }
    })
})

service.put('/users/:id', (request, response) => {
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




var server = service.listen(config.port, () => {
    console.log('Server in ascolto sulla porta 3000...');
})


