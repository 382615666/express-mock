
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
        next(error)
    }
}

exports = module.exports = layer