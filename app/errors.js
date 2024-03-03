const notFoundHandler = (req, res, next) => {
    const error = new Error('Resources not found')
    error.status = 404;
    next(error)
}

const globalErrorHandler = (error, req, res, next) => {
    if(error.status) {
        return res.status(error.status).json({
            message:error.message
        })
    }
    res.status(500).json({
        message: 'Server found error'
    })
}

module.exports = {
    notFoundHandler,
    globalErrorHandler
}