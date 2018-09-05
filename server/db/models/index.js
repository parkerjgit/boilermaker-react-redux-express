const Project = require('./project');
const Task = require('./task');

//relations
Project.hasMany(Task);

module.exports = {
  Project,
  Task
};
