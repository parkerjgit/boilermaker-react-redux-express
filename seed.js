const {db} = require('./server/db');
// const Author = require('./server/db/models/author');
// const Message = require('./server/db/models/message');
// const Channel = require('./server/db/models/channel');
const Projects = require('./server/db/models/projects')


// const id = () => Math.round(Math.random() * (authors.length - 1)) + 1;

const projects = [
  { name: 'project1' },
  { name: 'project2' },
  { name: 'project3' },
  { name: 'project4' }
]


const seed = () => (
  Promise.all(projects.map(project =>
    Projects.create(project))
  )
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
