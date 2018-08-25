const Sequelize = require('sequelize');
//TODO: ENTER YOUR DATABASE NAME IN THE ADRESS BELOW!!!
const db = new Sequelize('postgres://localhost:5432/INSERT_DB_NAME_HERE', {
  logging: false
});



module.exports = db;

