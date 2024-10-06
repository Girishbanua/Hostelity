const errorMiddleware = (err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    const extraInfo = err.extraInfo || "Error from backend"

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        extraInfo: extraInfo        
    })
}

module.exports = errorMiddleware