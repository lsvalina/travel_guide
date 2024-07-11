const { get } = require('axios')

/**
 * Returns data from API
 * @returns {Promise<Array>} List
 */
async function getData() {
    if (!process.env.DATA_URL) {
        throw new Error('No data URL provided.')
    }
    const response = await get(process.env.DATA_URL)
    const routes = response.data

    if (!Array.isArray(routes)) {
        throw new Error('Invalid data format received from the server')
    }

    return routes
}

exports.getData = getData
