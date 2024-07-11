const { query, validationResult } = require('express-validator')

const validateViewportParams = [
    query('lng1')
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude 1 must be a valid float between -180 and 180'),
    query('lat1').isFloat({ min: -90, max: 90 }).withMessage('Latitude 1 must be a valid float between -90 and 90'),
    query('lng2')
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude 2 must be a valid float between -180 and 180'),
    query('lat2').isFloat({ min: -90, max: 90 }).withMessage('Latitude 2 must be a valid float between -90 and 90'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    }
]

module.exports = validateViewportParams
