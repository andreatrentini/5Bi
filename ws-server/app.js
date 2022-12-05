const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config.js');
const usersRouter = require('./users.js');

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

service.use('/users', usersRouter);

var server = service.listen(config.port, () => {
    console.log('Server in ascolto sulla porta 3000...');
})


