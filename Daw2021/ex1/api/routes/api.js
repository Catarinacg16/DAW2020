var express = require('express');
var router = express.Router();
const Batismo = require("../controllers/batismo")


router.get('/batismos'),function(req,res){
    if(req.query.ano) {
        Batismo.listarByAno()
        .then(dados.map(d => {
            return d.date = d.date.split('-')[0]
        }))
        .catch(erro => res.status(500).send("Erro na listagem: " + erro))
    }
    else {
        Batismo.listar()
            .then(dados => res.jsonp(dados)) 
            .catch(erro => res.status(500).send("Erro na listagem: " + erro))
    }
    

}

router.get('/batismos/:id', function (req, res) {
    Batismo.findById(req.params.id)
        .then(dados => res.jsonp(dados)) 
        .catch(erro => res.status(500).send("Erro na listagem: " + erro))
});

router.get('/batismos/batisado', function (req, res) {
    Batismo.listarBatisados(req.params.id)
        .then(dados => res.jsonp(dados)) 
        .catch(erro => res.status(500).send("Erro na listagem: " + erro))
});

router.get('/batismos/progenitores', function (req, res) {
    Batismo.progenitores(req.params.id)
        .then(dados => res.jsonp(dados)) 
        .catch(erro => res.status(500).send("Erro na listagem: " + erro))
});

router.get('/batismos/stats', function (req, res) {
    Batismo.stats()
        .then(dados => res.jsonp(dados)) 
        .catch(erro => res.status(500).send("Erro na listagem: " + erro))
});



module.exports = router;
