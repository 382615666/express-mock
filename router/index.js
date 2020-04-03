const Layer = require('./layer')
const Route = require('./route')

function Router () {
    this.stack = []
}

Router.prototype.get = function (path, handle) {
    this.stack.push(new Layer(path, handle))
}

Router.prototype.route = function (path) {
    const route = new Route(path)
    const layer = new Layer(path, (req, res) => {
        route.dispatch(req, res)
    })
    layer.route = route
    this.stack.push(layer)

    return route
}

Router.prototype.handle = function (req, res) {
    this.stack.forEach(item => {
        if (item.match(req.url) && item.route && item.route.handle_method(req.method)) {
            item.handle_request(req, res)
        }
    })
}

Router.prototype.get = function (path, fn) {
    const route = this.route(path)
    route.get(fn)
    return this
}

exports = module.exports = Router