const http = require('http')
const route = require('./route')
const layer = require('./layer')

function router () {
    this.stack = []
}

router.prototype.route = function (path) {
    const r = new route(path)
    const l = new layer(path ,(req, res) => {
        r.dispatch(req, res)
    })
    l.route = r
    this.stack.push(l)
    return r
}

router.prototype.handler = function handler (req, res, done) {
    const stack = this.stack
    let index = 0

    function next (err) {
        if (i >= stack.length) {
            return done(err)
        }
        const l = stack[i++]
        if (l.match(req.url) && l.route.handlerMethod(req.method)) {
            l.handler(req, res, next)
        } else {
            next(err)
        }
    }
    next()
}

http.METHODS.forEach(method => {
    method = method.toLowerCase()
    router.prototype[method] = function (path, fn) {
        this.route(path)[method](fn)
        return this
    }
})




exports = module.exports = router