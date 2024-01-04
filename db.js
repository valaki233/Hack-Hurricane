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
    },
});
const User = sequelize.define('User', {
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
    age: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    childNumber: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    childNames: {
        type: Sequelize.DataTypes.STRING,
        // get() {
        //     return this.getDataValue('childNames').split(';');
        // },
        // set(val) {
        //     this.setDataValue('childNames', val.join(';'));
        // },
    },
    childAges: {
        type: Sequelize.DataTypes.STRING,
        // get() {
        //     return this.getDataValue('childAges').split(',').pop();
        // },
        // set(val) {
        //     for (let i = 0; i < val.length; i++) {
        //         final += val[i] + ',';
        //     }
        // },
    },
    childGender: {
        type: Sequelize.DataTypes.STRING,
        // get() {
        //     return this.getDataValue('childSex').split(';');
        // },
        // set(val) {
        // this.setDataValue('childSex', val.join(';'));
        // },
    }
});

// Then, you can create the table with:
sequelize.sync()
    .then(() => console.log('User table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

module.exports = {
    sequelize,
    User
};