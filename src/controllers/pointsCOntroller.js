const { getErrorResponse } = require('../services/errorService')
const turf = require('@turf/turf')
const { getData } = require('../services/dataService')
exports.findPointsInViewport = async (req, res) => {
    try {
        const { lng1, lat1, lng2, lat2 } = req.query

        const bbox = [parseFloat(lng1), parseFloat(lat1), parseFloat(lng2), parseFloat(lat2)]
        const boundingBox = turf.bboxPolygon(bbox)

        const routes = await getData()

        const pointsInViewport = routes.flatMap((route) =>
            route.pointsOnRoutes.filter((point) => {
                const regionPolygon = turf.polygon(point.point.region.geometry.coordinates)
                return turf.booleanContains(boundingBox, regionPolygon)
            })
        )
        res.json({ pointsInViewport })
    } catch (err) {
        const errorResponse = getErrorResponse(err)
        res.status(errorResponse.statusCode).json(errorResponse.error)
    }
}
