const http = require('http')
const Router = require('./router/index')

function application () {
    this._router = new Router()
}

application.prototype.listen = function listen () {
    const server = http.createServer((req, res) => {
        this.handle(req, res)
    })
    server.listen.apply(server, arguments)
}

application.prototype.get = function get (path, handle) {
    this._router.get(path, handle)
}

application.prototype.handle = function (req, res) {
    function finalHandle (err) {
        res.writeHead(404, {
			'Content-Type': 'text/plain'
		});

		if(err) {
			res.end('404: ' + err);	
		} else {
			var msg = 'Cannot ' + req.method + ' ' + req.url;
			res.end(msg);	
		}
    }

    this._router.handle(req, res, finalHandle)
}

exports = module.exports = application