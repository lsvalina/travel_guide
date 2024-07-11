const express = require('express')
const validateViewportParams = require('../../middleware/pointsValidation')
const { findPointsInViewport } = require('../../controllers/pointsCOntroller')
const router = express.Router()

router.get('/findPointsInViewport', validateViewportParams, findPointsInViewport)

module.exports = router
