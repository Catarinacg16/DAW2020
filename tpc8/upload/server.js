var express = require('express')
var bodyParser = require('body-parser')
var templates = require('./html-templates')
var jsonfile = require('jsonfile')
var logger = require('morgan')
var fs = require('fs')

var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

var app = express();

// Set logger
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// serve static files
app.use(express.static('public'));

app.get('/', function (req, res) {
    var d = new Date().toISOString().substr(0, 16) //vai buscar a hora
    var files = jsonfile.readFileSync('./dbFiles.json')
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.write(templates.fileList(files, d))
    res.end()
})

app.get('/files/upload', function (req, res) {
    var d = new Date().toISOString().substr(0, 16)
    var files = jsonfile.readFileSync('./dbFiles.json')
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.write(templates.fileForm(d))
    res.end()
})

app.get('/files/download/:filename', (req, res) => {
    res.download(__dirname + '/public/fileStore/' + req.params.filename)
})

app.post('/files', upload.array('listFile'), function (req, res) {
    // req.file is the 'myFile' file
    // req.body will hold the text fields, if there where any
    // multiple files: upload.array(...) => files is an array
    
    req.files.forEach((f,idx) => {
        console.log(f.size)
    let oldPath = __dirname + '/' + f.path
    let newPath = __dirname + '/public/fileStore/' + f.originalname

    fs.rename(oldPath, newPath, function (err) {
        if (err) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.write('<p> Erro: ao mover o ficheiro ...</p>')
            res.end()
        }
        else {
            var d = new Date().toISOString().substr(0, 16)
            var files = jsonfile.readFileSync('./dbFiles.json')
            var n = req.files.length

                if(n > 1){
                    files.push({
                        date: d,
                        name: f.originalname,
                        mimetype: f.mimetype,
                        size: f.size,
                        desc: req.body.desc[idx]
                    })
                }
                else if (n==1){
                    files.push({
                        date: d,
                        name: f.originalname,
                        mimetype: f.mimetype,
                        size: f.size,
                        desc: req.body.desc
                    })
                }
            
            }
        jsonfile.writeFileSync('./dbFiles.json', files)
   
        })

    })
    res.redirect('/')
})

app.listen(7700, () => console.log('Servidor está à escuta na port 7700...'))