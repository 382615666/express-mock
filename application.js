const http = require('http')
const Router = require('./router/index')

function listen () {
    const server = http.createServer((req, res) => {
        this._router.handle(req, res)
    })
    server.listen.apply(server, arguments)
}

const app = {
    _router: new Router(),
    get (path, handle) {
        this._router.get(path, handle)
    },
    listen
}

exports = module.exports = app