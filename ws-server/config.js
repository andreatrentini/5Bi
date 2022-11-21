const config = {
    passPhrase: 'Questa è la chiave usata per generare il token',
    tokenDuration: 300,
    port: 3000,
    dbConfig: {
        host: 'sql-progetto-prova',
        user: 'utente',
        password: 'root',
        database: 'dati-progetto'
    }
};

module.exports = config;