const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('project', {
  name: {
    type: Sequelize.STRING
  }
});
