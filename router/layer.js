
function Layer (path, handle) {
    this.path = path
    this.handle = handle
}

Layer.prototype.handle_request = function (req, res, next) {
    try {
        this.handle(req, res, next);
    } catch (err) {
        next(err);
    }
}

Layer.prototype.match = function (path) {
    return this.path === path
}

exports = module.exports = Layer