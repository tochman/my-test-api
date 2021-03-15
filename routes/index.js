const express = require('express')
const router = express.Router()
const resourceController = require('../controllers/resourceController')
const usersController = require('../controllers/usersController')

/* Create routes for each controller in your application. */
router
  .get('/resource', resourceController.index)
  .get('/users', usersController.index)

module.exports = router
