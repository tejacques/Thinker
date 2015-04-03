import express = require('express')
import serveStatic = require('serve-static')

var app = express()

app.use(serveStatic('.'))
app.listen(3000)