const express = require('express')
const routes = require('./api/routes')
const points = require('./api/points')
const router = express.Router()

router.use('/routes', routes)
router.use('/points', points)

module.exports = router
