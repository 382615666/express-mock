const proto = require('./application')

function createApplication () {
    const app = function (req, res, next) {
        // app.handler(req, res, next)
        console.log(111)
    }
    app.prototype = proto
    console.log(app.prototype)
    return app
}

exports = module.exports = createApplication
