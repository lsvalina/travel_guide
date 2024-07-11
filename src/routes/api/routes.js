const express = require('express')
const { findNearestRoutes } = require('../../controllers/routesController')
const NearestRoutes = require('../../middleware/routeValidation')
const router = express.Router()

router.get('/findNearestRoutes', NearestRoutes, findNearestRoutes)

module.exports = router
