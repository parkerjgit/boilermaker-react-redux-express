const router = require('express').Router()
const {User} = require('../db/models')


// a login route that returning users will use. If there are any problems (user doesn't exist, wrong password), give 'em the 401.
router.put('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) res.status(401).send('User not found');
      else if (!user.hasMatchingPassword(req.body.password)) res.status(401).send('Incorrect password');
      else {
        req.login(user, err => {
          if (err) next(err);
          else res.json(user);
        });
      }
    })
    .catch(next);
});

// a sign up route that will create a user. Once the user is created, it should be set as the user on the session. Passport makes this very easy by attaching a login method to the request object.
router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      console.log(`--- user created: ${user}`)
      req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      });
    })
    .catch(next);
});

// To log out, we need to destroy the user on our session. Passport makes this very easy by attaching a logout method to the request object.
router.delete('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy()
  res.sendStatus(204);
});

// route to fetch the logged-in user on our session. client will make this request every time the client application loads - this allows us to keep the user logged in on the client even after they refresh.
// Since passport attaches the session user to the request object, this is straightforward.
router.get('/me', (req, res, next) => {
  res.json(req.user);
});

module.exports = router;

