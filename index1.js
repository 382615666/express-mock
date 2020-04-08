const express = require('express')

const app = express()

// app.get('/aa', (req, res) => {

// })

app.get('/test', (req, res, next) => {
    next()
}).get('/test', (req, res, next) => {
    next(new Error('哈哈'))
}).get('/test', (req, res) => {
    res.writeHead(200, {
        'content-type': 'text/plain'
    })
    res.end('/test')
})

app.listen(3001, () => {
    console.log('listen 3001')
})