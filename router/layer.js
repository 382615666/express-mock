
function layer (path, fn) {
    this.path = path
    this.fn = fn
}

layer.prototype.match = function match (url) {
    return this.path === url
}

layer.prototype.handler = function handler (req, res, next) {
    try {
        this.fn(req, res, next)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

layer.prototype.handlerError = function (err, req, res, next) {
    if (this.fn.length !== 4) {
        return next(err)
    }
    try {
        this.fn(err, req, res, next)
    } catch (error) {
        next(error)
    }
}

exports = module.exports = layer