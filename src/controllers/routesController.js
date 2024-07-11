const { getData } = require('../services/dataService')
const { getErrorResponse } = require('../services/errorService')
const turf = require('@turf/turf')

exports.findNearestRoutes = async (req, res) => {
    try {
        const { lat, lng, count = 10 } = req.query
        const userLocation = turf.point([parseFloat(lat), parseFloat(lng)])

        const routes = await getData()

        const nearestRoutes = routes
            .map((route) => {
                const nearestPoint = route.pointsOnRoutes.reduce((closest, point) => {
                    const regionPolygon = turf.polygon(point.point.region.geometry.coordinates)
                    const center = turf.center(regionPolygon)
                    const distance = turf.distance(userLocation, center)
                    if (!closest || distance < closest.distance) {
                        return { point, distance }
                    }
                    return closest
                }, null)

                return { route, distance: nearestPoint?.distance }
            })
            .sort((a, b) => a.distance - b.distance)
            .slice(0, count)

        res.json(nearestRoutes)
    } catch (err) {
        const errorResponse = getErrorResponse(err)
        res.status(errorResponse.statusCode).json(errorResponse.error)
    }
}
