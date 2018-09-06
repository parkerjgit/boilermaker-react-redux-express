const db = require('./db')

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

// ------------ session middleware ------------------ //

// sessions ---
const session = require('express-session');
const passport = require('passport');

// configure and create our database store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });

// sync so that our session table gets created
dbStore.sync();

// plug the store into our session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}));
// Then, on our deployment server, we can set an environment variable called SESSION_SECRET with our real secret!
// Our secrets would still be exposed if an attacker got access to our server (but if that happens, we're pretty much screwed anyway). So as long as we protect access to our deployment server, we should be fine.

// ------------ passport middleware ------------------ //

// serialization is usually only done once per session (after we invoke req.login, so that passport knows how to remember the user in our session store. Generally, we use the user's id.
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

// Deserialization runs with every subsequent request that contains a serialized user on the session - passport gets the key that we used to serialize the user, and uses this to re-obtain the user from our database.
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

// initialize passport so that it will consume our req.session object, and attach the user to the request object.
app.use(passport.initialize());
app.use(passport.session());

// ----------------- route -------------------- //

// app.use('/api', projects)
app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

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

// start it up -------------------

if (process.env.NODE_ENV === 'development') {
  require('./config/secrets'); // this will mutate the process.env object with your secrets.
}

const PORT = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!

db.sync({force:true})  // sync our database
  .then(function(){
    app.listen(`${PORT}`, () => {
      console.log(`listening on port ${PORT}`);
    });
  })

// module.exports = app
