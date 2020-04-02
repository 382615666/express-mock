const proto = require('./application')

function createApplication () {
    const app = function (req, res, next) {
        // app.handler(req, res, next)
        console.log(111)
    }
    Object.keys(proto).forEach(key => {
        if (!app[key]) {
            app[key] = proto[key]
        }
    })
    console.log(app)
    return app
}

exports = module.exports = createApplication
