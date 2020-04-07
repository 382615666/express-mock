const http = require('http')
const layer = require('./layer')

function route (path) {
    this.path = path
    this.stack = []
    this.method = {}
}

route.prototype.dispatch = function dispatch (req, res, done) {
    const stack = this.stack
    let index = 0
    function next (err) {
        
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
        this.method[method] = method
        this.stack.push(l)
    }
})

exports = module.exports = route