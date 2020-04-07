const application = require('./application')

function createApplication () {
    // const app = function (req, res, next) {
    //     // app.handler(req, res, next)
    // }
    // Object.keys(proto).forEach(key => {
    //     if (!app[key]) {
    //         app[key] = proto[key]
    //     }
    // })
    const app = new application()
    return app
}

exports = module.exports = createApplication
