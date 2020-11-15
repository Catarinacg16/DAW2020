var http = require('http')
var axios = require('axios')

http.createServer(function (req, res) {
    console.log(req.method + ' ' + req.url)
    if (req.method == 'GET') {
        if (req.url == '/') {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
            res.write('<h2>Escola de Música</h2>')
            res.write('<ul>')
            res.write('<li><a href="/alunos">Lista de alunos</a></li>')
            res.write('<li><a href="/cursos">Lista de Cursos</a></li>')
            res.write('<li><a href="/instrumentos">Lista de instrumentos</a></li>')
            res.write('</ul>')
            res.end()
        }
        else if (req.url == '/alunos') {
            axios.get('http://localhost:3000/alunos')
                .then(function (resp) {
                    alunos = resp.data;
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write('<h2>Escola de Música: Lista de Alunos</h2>')
                    res.write('<ul>')

                    alunos.forEach(a => {
                        res.write('<li><a href="/alunos/' + a.id + '">' + a.id + '</a>' + ' - ' + a.nome + '</li>')
                    });

                    res.write('</ul>')
                    res.write('<address>[<a href="/">Voltar</a>]</address>')
                    res.end()
                })
                .catch(function (error) {
                    console.log('Erro na obtençao da lista de alunos: ' + error);
                });
        }
        else if (req.url.match(/\/alunos\/A[1-9]*/)) {
            var partes = req.url.split('/')
            var id = partes[partes.length - 1]
            axios.get('http://localhost:3000/alunos/'+id)
                .then(function (resp) {
                    alunos = resp.data;
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write('<h2>Escola de Música</h2>')
                    res.write('<h3>Aluno:'+ id +'</h3>')
                    res.write('<ul>')
                    res.write('<li> Nome:   '+ alunos.nome +'</li>')
                    res.write('<li> Data de Nascimento:  '+ alunos.dataNac +'</li>')
                    res.write('<li> Curso:   '+ alunos.curso +'</li>')
                    res.write('<li> Ano de Curso:   '+ alunos.anoCurso +'</li>')
                    res.write('<li> Instrumento:   '+ alunos.instrumento +'</li>')
                    res.write('</ul>')
                    res.write('<address>[<a href="/alunos">Voltar</a>]</address>')
                    res.end()
                })

        }
        else if (req.url == '/cursos') {
            axios.get('http://localhost:3000/cursos')
                .then(function (resp) {
                    cursos = resp.data;
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write('<h2>Escola de Música: Lista de Cursos</h2>')
                    res.write('<ul>')

                    cursos.forEach(a => {
                        res.write('<li><a href="/cursos/' + a.id + '">' + a.id + '</a>' + ' - ' + a.designacao + '</li>')
                    });

                    res.write('</ul>')
                    res.write('<address>[<a href="/">Voltar</a>]</address>')
                    res.end()
                })
                .catch(function (error) {
                    console.log('Erro na obtençao da lista de cursos: ' + error);
                });
        }
        else if (req.url.match(/\/cursos\/C(.)*/)) {
            var partes = req.url.split('/')
            var id = partes[partes.length - 1]
            axios.get('http://localhost:3000/cursos/'+id)
                .then(function (resp) {
                    cursos = resp.data;
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write('<h2>Escola de Música</h2>')
                    res.write('<h3>Curso: '+ id +'</h3>')
                    res.write('<ul>')
                    res.write('<li> Designação:   '+ cursos.designacao +'</li>')
                    res.write('<li> Duração:  '+ cursos.duracao +'</li>')
                    res.write('<li> Instrumento:   '+ cursos.instrumento.id +' '+ cursos.instrumento["#text"]+ '</li>')
                    res.write('</ul>')
                    res.write('<address>[<a href="/cursos">Voltar</a>]</address>')
                    res.end()
                })

        }
        else if (req.url == '/instrumentos') {
            axios.get('http://localhost:3000/instrumentos')
                .then(function (resp) {
                    cursos = resp.data;
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write('<h2>Escola de Música: Lista de Instrumentos</h2>')
                    res.write('<ul>')

                    cursos.forEach(a => {
                        res.write('<li><a href="/instrumentos/' + a.id + '">' + a.id + '</a>' + ' - ' + a["#text"] + '</li>')
                    });

                    res.write('</ul>')
                    res.write('<address>[<a href="/">Voltar</a>]</address>')
                    res.end()
                })
                .catch(function (error) {
                    console.log('Erro na obtençao da lista de cursos: ' + error);
                });
        }
        else if (req.url.match(/\/instrumentos\/I[1-9]*/)) {
            var partes = req.url.split('/')
            var id = partes[partes.length - 1]
            axios.get('http://localhost:3000/instrumentos/'+id)
                .then(function (resp) {
                    instrumento = resp.data;
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write('<h2>Escola de Música</h2>')
                    res.write('<h3>Instrumento: '+ id +'</h3>')
                    res.write('<ul>')
                    res.write('<li> Designação:   '+ instrumento["#text"] +'</li>')
                    res.write('</ul>')
                    res.write('<address>[<a href="/instrumentos">Voltar</a>]</address>')
                    res.end()
                })

        }
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write("<p>Pedido nao suportado: " + req.method + " " + req.url + "</p>")
        res.end()
    }

}).listen(4000)

console.log('Servidor à escuta na porta 4000...')