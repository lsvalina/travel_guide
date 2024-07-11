const request = require('supertest')
const nock = require('nock')
const app = require('../../app')
const fs = require('fs')
const path = require('path')

describe('GET /findNearestRoutes', () => {
    let mockedData

    beforeAll(() => {
        const filePath = path.resolve(__dirname, './mocks/data.geojson')
        mockedData = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should return nearest routes', async () => {
        nock(process.env.DATA_URL)
            .get('')
            .reply(200, mockedData)

        const res = await request(app)
            .get('/api/routes/findNearestRoutes')
            .query({ lat: 40.712776, lng: -74.005974, count: 1 })

        expect(res.status).toBe(200)
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body[0]).toHaveProperty('distance')
        expect(res.body[0]).toHaveProperty('route')
        expect(res.body[0].route).toHaveProperty('id', 1031)
    })

    it('should return validation error for missing query params', async () => {

        const res = await request(app)
            .get('/api/routes/findNearestRoutes')
            .query({ lat: 40.712776 });

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toBeInstanceOf(Array)
    })
})
