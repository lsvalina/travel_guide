const request = require('supertest')
const nock = require('nock')
const { resolve } = require('node:path')
const { readFileSync } = require('node:fs')
const app = require('../../app')

describe('GET /api/routes/viewport', () => {
    let mockedData

    beforeAll(() => {
        const filePath = resolve(__dirname, './mocks/data.geojson')
        mockedData = JSON.parse(readFileSync(filePath, 'utf8'))
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should return points in viewport', async () => {
        nock(process.env.DATA_URL)
            .get('')
            .reply(200, mockedData)

        const res = await request(app)
            .get('/api/points/findPointsInViewport')
            .query({ lng1: -74.25909, lat1: 40.477399, lng2: -73.700272, lat2: 40.917577 })

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('pointsInViewport')
        expect(res.body.pointsInViewport).toBeInstanceOf(Array)
    })

    it('should return validation error for missing query params', async () => {
        const res = await request(app)
            .get('/api/points/findPointsInViewport')
            .query({ lat1: 40.477399, lng2: -73.700272, lat2: 40.917577 })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toBeInstanceOf(Array)
    })
})
