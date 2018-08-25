const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('projects', {
  name: {
    type: Sequelize.STRING
  }
});
