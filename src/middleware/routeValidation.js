const { query, validationResult } = require('express-validator')
const NearestRoutes = [
    query('lat').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a valid float between -90 and 90'),
    query('lng').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a valid float between -180 and 180'),
    query('count').optional().isInt({ min: 1 }).withMessage('Count must be a positive integer'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    }
]
module.exports = NearestRoutes
