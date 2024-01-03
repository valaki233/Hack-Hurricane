const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite', // Replace with the path to your SQLite database file
});

module.exports = sequelize;

const Attractions = sequelize.define('Attractions', {
    // Model attributes are defined here
    id: {

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
    }
});
const User = sequelize.define('Userdata', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    childNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    childAges: {
        type: DataTypes.STRING,
        get() {
            return this.getDataValue('childAges').split(';');
        },
        set(val) {
        this.setDataValue('childAges', val.join(';'));
        },
    },
    childSex: {
        type: DataTypes.STRING,
        get() {
            return this.getDataValue('childSex').split(';');
        },
        set(val) {
        this.setDataValue('childSex', val.join(';'));
        },
    }
});

// Then, you can create the table with:
sequelize.sync()
    .then(() => console.log('User table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));