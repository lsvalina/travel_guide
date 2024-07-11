/**
 * Returns data from API
 * @param {Error} error Received error
 * @typedef ErrorResponse
 * @property {string|Array<string>} error Error message
 * @property {number} statusCode Status Code
 * @returns {ErrorResponse} List
 */
function getErrorResponse(error) {
    let statusCode = 500
    let message = 'An unexpected error occurred'

    if (error.isAxiosError) {
        statusCode = error.response ? error.response.status : 500
        message = error.response ? error.response.data : 'External service error'
    } else if (error.message) {
        message = error.message
    }

    return {
        statusCode,
        error: message
    }
}

exports.getErrorResponse = getErrorResponse
