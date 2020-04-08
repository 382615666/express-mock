const http = require('http')
const layer = require('./layer')

function route (path) {
    this.path = path
    this.stack = []
    this.method = {}
}

route.prototype.dispatch = function dispatch (req, res, done) {
    const stack = this.stack
    const _this = this
    let index = 0
    function next (err) {
        if (index >= stack.length) {
            return done(err)
        }

        const l = stack[index++]
        if (req.method.toLowerCase() !== l.method) {
            return done(err)
        }
        if (err) {
            return l.handlerError(err, req, res, next)
        } else {
            return l.fn(req, res, next)
        }
    }
    next()
}

route.prototype.handlerMethod = function method (method) {
    return this.method[method.toLowerCase()]
}

http.METHODS.forEach(method => {
    method = method.toLowerCase()
    route.prototype[method] = function (fn) {
        const l = new layer('/', fn)
        l.method = method
        this.method[method] = true
        this.stack.push(l)
    }
})

exports = module.exports = route