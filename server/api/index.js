const router = require('express').Router();
module.exports = router;

// API SUB-ROUTES GO HERE...
router.use('/projects', require('./projects'));
router.use('/tasks', require('./tasks'));

// If someone makes a request that starts with `/api`,
// but you DON'T have a corresponding router, this piece of
// middleware will generate a 404, and send it to your
// error-handling endware!
router.use((req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});
