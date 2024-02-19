const Sequelize= require('sequelize');

const sequelize = new Sequelize('user', 'root', '', {
	host: '127.0.0.1',
	dialect: 'mysql',
	define: {
		timestamps: false // Disable timestamps for all tables
	},
	logging: false
});
sequelize.authenticate()
	.then(() => {
		console.log('Connected to MySQL database!');
	})
	.catch((err) => {
		console.error('Error connecting to MySQL database: ', err);
	});
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: Sequelize.STRING,
        fname: Sequelize.STRING,
        lname: Sequelize.STRING,
        type: Sequelize.STRING, // owner, user
        telephone:  Sequelize.STRING,
        picture: Sequelize.STRING,
        otp: Sequelize.STRING,
    });
    const Restaurant = sequelize.define('restaurant', {
        restaurantid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        lat: Sequelize.STRING,
        lng: Sequelize.STRING,
        village: Sequelize.STRING,
        city:Sequelize.STRING,
        picture: Sequelize.STRING,
        userid: Sequelize.INTEGER,
    });
   
    sequelize.sync();

    module.exports = {
        sequelize,
        User,
        Restaurant,
     
    };