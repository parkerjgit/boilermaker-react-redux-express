const express = require('express');
const router = express.Router();
const { Project } = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.findAll()
    res.json(projects)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
