const logger = (req,res,next) => {
    console.log('Logger Called');
    next()
}

module.exports = logger
