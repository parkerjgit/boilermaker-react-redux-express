const express = require('express');
const router = express.Router();
const {Projects} = require('../db/models')

router.get('/projects', async (req, res, next) => {
  try {
    const projects = await Projects.findAll()
    res.json(projects)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
