const http = require('http')

function listen () {
    const server = http.createServer()
    server.listen.apply(server, arguments)
}

const app = {
    listen
}

exports = module.exports = app