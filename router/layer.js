
function Layer (path, handle) {
    this.path = path
    this.handle = handle
}

Layer.prototype.handle_request = function (req, res) {
    if (this.handle) {
        this.handle(req, res)
    }
}

Layer.prototype.match = function (path) {
    return this.path === path
}

exports = module.exports = Layer