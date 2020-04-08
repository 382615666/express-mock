const application = require('./application')
// const router = require('./router')
function express () {
    function app () {
        app.handler.apply(app, arguments)
    }

    Object.setPrototypeOf(app, application)
    return app
}

exports = module.exports = express
// exports.router = module.exports.router = router