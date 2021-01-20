var express = require('express');
var router = express.Router();
var axios = require('axios');

function getToken(){
  return axios.post("http://clav-api.di.uminho.pt/v2/users/login", {
    username: "daw2020@teste.uminho.pt", password:"232"
  })
}
var token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMDgxMGM2NDFhYmQ1NDU0MDZkZmRkMSIsImxldmVsIjoyLCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJkYXcyMDIwQHRlc3RlLnVtaW5oby5wdCIsImlhdCI6MTYxMTE1Mjg5NiwiZXhwIjoxNjExMTgxNjk2fQ.dBBU8tZhedYfLBrgLzk5Du13W2iwQ2t0SPrTi6-_JA7MNOG5nhEf2HQJC_eopAxVz48iKKsN5hoTn9fh-0YivWkHfwaFIj3Vg7Zu2iHXJPz73bsdj7L-VKcJeB-mAm04xIPRZ_q_5cY1VD5nEF7_noDVuzgv2qb_fqeI71FlditWjVRK2cuHNMy9B5b-u_8WOmUwcAFgtbmDM3u0TXsxj_BXZivVIczG-Nyyz90aRMx5hKbhFgUH_EW6F7UaIS5K_u7bx-emioCUqQDBeK6Cy4shRQn8S0698pB05pLQ3WcpqTLAm4KT3WpaR8oWC9MvjUHDbLDL-YwWgVguHJgMpQ'


router.get('/classes/:codigo',function(req, res, next) {
  var array = []
  var nivel3 = 0
  axios.get("http://clav-api.di.uminho.pt/v2/classes/c" + req.params.codigo+ "?token=" + token)
  .then(dados=> {
    pai = dados.data.pai.codigo
    if(dados.data.nivel == 1){
      pai = 0
    }
    if(dados.data.nivel == 3){
      nivel3 = 1
    }
    console.log(array)
    res.render('classe2',{classe: dados.data, arr: array, bool: nivel3, pai: pai})
  })
  .catch(erro => res.render('error',{error:erro}))
  
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CLAV: Classificação e Avaliação da Informação Pública' });
});

router.get('/classes', function(req, res, next) {
  //let mytoken = await getToken()
  //console.log(mytoken)
  axios.get("http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=" +token)
    .then(dados => {res.render('classe', { classes: dados.data});})
    .catch(erro=>{res.render('error',{error: erro});})
});



router.get('/termoInd', function(req, res, next) {
  //let mytoken = await getToken()
  //console.log(mytoken)
  axios.get("http://clav-api.di.uminho.pt/v2/termosIndice?token=" +token)
    .then(dados => {res.render('termos', { termos: dados.data});})
    .catch(erro=>{res.render('error',{error: erro});})
});

/* GET home page. */
/*
router.get('/', async function(req, res, next) {
  let mytoken = await getToken()
  //console.log(mytoken.data)
  axios.get("http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=" + mytoken.data.token)
    .then(dados => {res.render('index', {level: 1, classes: dados.data});})
    .catch(erro=>{res.render('error',{error: erro});})
});

router.get('/:id', async function(req, res, next) {

  let dados = await getToken()
  var array = []
  var nivel3 = 0
  axios.get("http://clav-api.di.uminho.pt/v2/classes/c" + req.params.id + "?token=" + dados.data.token)
  .then(dados=> {
    pai = dados.data.pai.codigo
    if(dados.data.nivel == 1){
      pai = 0
    }
    if(dados.data.nivel == 3){
      nivel3 = 1
    }
    console.log(array)
    res.render('classe',{classe: dados.data, arr: array, bool: nivel3, pai: pai})
  })
  .catch(erro => res.render('error',{error:erro}))
  
});

*/
module.exports = router;
