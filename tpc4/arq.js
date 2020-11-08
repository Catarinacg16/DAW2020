var http = require('http')
var fs = require('fs')

http.createServer(function (req, res) {
    if (req.url.match(/\/arqs$/)) {
        var num = req.url.split("/")[req.url.lengrh - 1]
        console.log(num)
        fs.readFile('arqs/index.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(data)
            res.end()
        })
    }
    else if (req.url.match(/\/arqs\/\b([1-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-2])\b/)) {
        var partes = req.url.split('/')
        var pag = partes[partes.length - 1]
        console.log(req.method + ' ' + req.url)
        console.log('Ficheiro: ' + pag)
        fs.readFile('arqs/' + pag + '.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(data)
            res.end()
        })
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write("<p>O URL nao corresponde ao esperado</p>")
        res.end()
    }
}).listen(7777)