const Sequelize = require('sequelize');

// If using Heroku as a deployment service and Heroku Postgres as your database,
// the database url in your Heroku environment will be available in an environment
// variable DATABASE_URL
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/simplecrud', {
  logging: false
});


module.exports = db;

