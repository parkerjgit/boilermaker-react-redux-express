const express = require('express');
const router = express.Router();
const { Task } = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.findAll()
    res.json(tasks)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
