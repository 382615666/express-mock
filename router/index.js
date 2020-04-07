const Layer = require('./layer')
const Route = require('./route')

function Router () {
    this.stack = []
}

Router.prototype.route = function (path) {
    const route = new Route(path)
    const layer = new Layer(path, route.dispatch.bind(route))
    layer.route = route
    this.stack.push(layer)

    return route
}

Router.prototype.handle = function (req, res, done) {
    const method = req.method
    const stack = this.stack
    let index = 0

    function next (err) {
        const layerError = (err === 'route' ? null : err);
        if (layerError === 'router') {
            return done(null)
        }
        if (index >= stack.length || layerError) {
            return done(layerError)
        }

        const layer = stack[index++]

        if (layer.match(req.url) && layer.route && layer.route.handle_method(req.method)) {
            return layer.handle_request(req, res, next)
        } else {
            next(layerError)
        }

    }
    next()
}

Router.prototype.get = function (path, fn) {
    const route = this.route(path)
    route.get(fn)
    return this
}

exports = module.exports = Router