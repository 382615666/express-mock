const http = require('http')
const route = require('./route')
const layer = require('./layer')

function router () {
    this.stack = []
}

router.prototype.route = function (path) {
    const r = new route(path)
    const l = new layer(path, r.dispatch.bind(r))
    l.route = r
    this.stack.push(l)
    return r
}

router.prototype.handler = function handler (req, res, done) {
    const stack = this.stack
    let index = 0

    function next (err) {
        if (index >= stack.length) {
            return done(err)
        }
        if (err) {
            return done(err)
        }
        const l = stack[index++]
        if (l.match(req.url) && l.route && l.route.handlerMethod(req.method)) {
            return l.handler(req, res, next)
        } else {
            next(err)
        }
    }
    next()
}

router.prototype.use = function use (fn) {
    let path = '/'
    if (typeof fn !== 'function') {
        path = fn
        fn = arguments[1]
    }
    const l = new layer(path, fn)
    this.stack.push(l)
    return this
}

http.METHODS.forEach(method => {
    method = method.toLowerCase()
    router.prototype[method] = function (path, fn) {
        this.route(path)[method](fn)
        return this
    }
})




exports = module.exports = router