const express = require('./express')

const app = express()

app.use('/use', (req, res, next) => {
    next()
})

app.get('/test', (req, res, next) => {
    next()
}).get('/test', (req, res) => {
    res.writeHead(200, {
        'content-type': 'text/plain'
    })
    res.end('/test')
})

app.listen(3000, () => {
    console.log('listen 3000')
})