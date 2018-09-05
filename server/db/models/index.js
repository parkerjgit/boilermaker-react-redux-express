const Project = require('./project');
const Task = require('./task');
const User = require('./user')

//relations
Project.hasMany(Task);

module.exports = {
  Project,
  Task,
  User
};
