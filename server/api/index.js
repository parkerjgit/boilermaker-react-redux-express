const router = require('express').Router();
module.exports = router;

// API SUB-ROUTES GO HERE...
router.use('/projects', require('./projects'));

router.use((req, res, next) => {
  res.status(404).send('Not found');
});
