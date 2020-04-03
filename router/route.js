
const Layer = require('./layer')

function Route () {
    this.stack = []
    this.method = {}
}

Route.prototype.get = function (handle) {
    const layer = new Layer('/', handle)
    layer.method = 'get'
    this.method.get = true
    this.stack.push(layer)
    return this
}


Route.prototype.handle_method = function (method) {
    return this.method[method.toLowerCase()]
}

Route.prototype.dispatch = function (req, res) {
    this.stack.forEach(item => {
        if (req.method.toLowerCase() === item.method) {
            item.handle_request(req, res)
        }
    })
}

exports = module.exports = Route