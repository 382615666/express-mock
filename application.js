const http = require('http')
const router = require('./router')

const application = {
    _router: new router()
}

application.listen = function listen () {
    const server = http.createServer(this)
    server.listen.apply(server, arguments)
}

application.handler = function handler (req, res) {
    function handler (err) {
        res.writeHead(200, {
            'content-type': 'text/plain'
        })
        res.end(`404: ${err}`)
    }
    this._router.handler(req, res, handler)
}
http.METHODS.forEach(method => {
    method = method.toLowerCase()
    application[method] = function (path, fn) {
        this._router[method](path, fn)
        return this
    }
})

application.use = function use (fn) {
    let path = '/'
    
    if (typeof fn !== 'function') {
        path = fn
        fn = arguments[1]
    }
    this._router.use(path, fn)
    return this
}

exports = module.exports = application