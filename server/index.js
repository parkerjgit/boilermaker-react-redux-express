const express = require('express');
const morgan = require('morgan');
const path = require('path');
//TODO: FIX ROUTER NAME AND PATH BELOW!!!
const projects = require('./api/projects');
const app = express();

//morgan middleware
app.use(morgan('dev'));

//to use public folder
app.use(express.static(path.join(__dirname, '..', 'public')));

//for any bodies we receive
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//TODO: INSERT ACTUAL ROUTE AND ROUTER NAME BELOW!!!
app.use('/api', projects)

//sends the one html page we have upon someone requesting the site
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

//for 404 errors
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

module.exports = app
