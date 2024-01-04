const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'data.db', // Replace with the path to your SQLite database file
});


const Attractions = sequelize.define('Attractions', {
    // Model attributes are defined here
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    lat: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
    },
    long: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
    }
}, { timestamps: false});

// Then, you can create the table with:
sequelize.sync({alter: true})
    .then(() => console.log('User table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

module.exports = {
    sequelize,
    Attractions
};