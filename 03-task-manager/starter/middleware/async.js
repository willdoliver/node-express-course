const asyncWrapper = (fn) => {
    return async(req,res,next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            // send to next middleware (error-handler)
            next(error)
        }
    }
}

module.exports = asyncWrapper