const PORT = 1337;
const app = require('.')
const {db} = require('./db')

//sync db and start server
const init = async () => {
  await db.sync(); //TODO: INSERT { force: true } INTO SYNC CALL IF TESTING
  app.listen(`${PORT}`, () => {
    console.log(`listening on port ${PORT}`);
  });
};

init();
