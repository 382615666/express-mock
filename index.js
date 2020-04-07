const express = require('./express')

const app = express()

app.get('/test', (req, res) => {
    res.writeHead(200, {
        'content-type': 'text/plain'
    })
    res.end('/test')
})

app.listen(3000, () => {
    console.log('listen 3000')
})