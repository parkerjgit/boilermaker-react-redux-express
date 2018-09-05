const db = require('./server/db');
// const Author = require('./server/db/models/author');
// const Message = require('./server/db/models/message');
// const Channel = require('./server/db/models/channel');
const Project = require('./server/db/models/project')
const Task = require('./server/db/models/task')

// const id = () => Math.round(Math.random() * (authors.length - 1)) + 1;

const projects = [
  { name: 'project1' },
  { name: 'project2' },
  { name: 'project3' },
  { name: 'project4' }
]

const tasks = [
  { name: 'task1', projectId: 1 },
  { name: 'task2', projectId: 1 },
  { name: 'task3', projectId: 2 },
  { name: 'task4', projectId: 2 },
  { name: 'task5', projectId: 2 },
  { name: 'task6', projectId: 4 },
]

const seed = () => (
  Promise.all(projects.map(project =>
    Project.create(project))
  ).then(() =>
  Promise.all(tasks.map(task =>
    Task.create(task))
  ))
);

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();

// module.exports = main;
