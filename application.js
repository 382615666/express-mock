const http = require('http')
const router = require('./router')

function application () {
    this._router = new router()
}

application.prototype.listen = function listen () {
    const server = http.createServer((req, res) => {
        this.handler(req, res)
    })

    server.listen.apply(server, arguments)
}

application.prototype.handler = function handler (req, res) {
    function handler (err) {
        res.writeHead(200, {
            'content-type': 'text/plain'
        })
        res.end(`404: ${err}`)
    }
    this._router.handler(req, res, err)
}
http.METHODS.forEach(method => {
    method = method.toLowerCase()
    application.prototype[method] = function (path, fn) {
        this._router[method](path, fn)
    }
})

exports = module.exports = application