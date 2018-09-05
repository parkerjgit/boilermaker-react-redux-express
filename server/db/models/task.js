const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('task', {
  name: {
    type: Sequelize.STRING
  }
});
