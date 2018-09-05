const express = require('express');
const morgan = require('morgan');
const path = require('path');

// const PORT = 1337;
// const app = require('.')


const app = express();

//morgan middleware
app.use(morgan('dev'));

//to use public folder
app.use(express.static(path.join(__dirname, '..', 'public')));

//for any bodies we receive
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/api', projects)
app.use('/api', require('./api'));

//sends the one html page we have upon someone requesting the site
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

// If someone makes a request that does NOT start with `/api`,
// this middleware will generate a 404, and send it to your
// error-handling endware!
app.use((req, res, next) =>
  path.extname(req.path).length > 0 ?
    res.status(404).send('Not found') :
    next()
);

//for server errors
app.use((err, req, res, next) => {
  console.error(err, typeof next)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

const db = require('./db')
const PORT = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!

db.sync()  // sync our database
  .then(function(){
    app.listen(`${PORT}`, () => {
      console.log(`listening on port ${PORT}`);
    });
  })

// module.exports = app
