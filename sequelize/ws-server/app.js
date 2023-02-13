const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('dati-sequelize', 'utente', 'root', {
    host: 'sql-sequelize',
    dialect: 'mysql'
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const User = sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    }
});

(async () => {
    await User.sync()
});

(async () => {
    await sequelize.sync()
})

testConnection();