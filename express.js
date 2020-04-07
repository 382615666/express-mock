const application = require('./application')

function express () {
    const app = new application()

    return app
}

exports = module.exports = express