
const Layer = require('./layer')

function Route (path) {
    this.path = path
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

Route.prototype.dispatch = function (req, res, done) {
    const method = req.method.toLowerCase()
    const stack = this.stack
    let index = 0

    function next (err) {
        if (err === 'route') {
            return done()
        }
        if (err === 'router') {
            return done(err)
        }
        if (index >= stack.length) {
            return done(err)
        }

        const layer = stack[index++]
        if (method !== layer.method) {
            return next(err)
        }

        if (err) {
            return done(err)
        } else {
            layer.handle_request(req, res, next)
        }
    }
    next()
}

exports = module.exports = Route