var express = require('express');
var router = express.Router();

var Student = require('../controllers/student')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/students', function(req, res) {
  // Data retrieve
  Student.list()
    .then(data => res.render('students', { list: data }))
    .catch(err => res.render('error', {error: err}))
  ;
});

router.get('/students/registar', function(req,res) {
  res.render('newstudent', { title: 'Novo Aluno' });
});

router.get('/students/delete/:id', (req,res)=>{
  var id = req.params.id
  Student.delete(id)
  res.redirect('/students')
})

router.get('/students/:id', function(req,res) {
  var id = req.params.id
  Student.lookUp(id)
    .then(data => res.render('student', { student: data }))
    .catch(err => res.render('error', {error: err}))
    ;
})



router.get('/students/edit/:id', function(req,res) {
  var id = req.params.id
  Student.lookUp(id)
    .then(data => res.render('edit', { student: data }))
    .catch(err => res.render('error', {error: err}))
  ;
})

router.post('/students', function(req,res) {
  
  var valores = [0,0,0,0,0,0,0,0]
  
  let tpcs = Object.values(req.body)
  var size = tpcs.length

  for( var i=3,j=0; i<size; i++,j++){
    if (tpcs[i] == 'on'){
       valores[j] = 1
    }
  }

  req.body.tpc = valores
  Student.insert(req.body)
  res.redirect('/students')
})

router.post('/students/:id',(req,res) => {
  var valores = [0,0,0,0,0,0,0,0]
  var id = req.params.id
  let tpcs = Object.values(req.body)
  var size = tpcs.length

  for( var i=3,j=0; i<size; i++,j++){
    if (tpcs[i] == 'on'){
       valores[j] = 1
    }
  }
  
  req.body.tpc = valores
  Student.edit(req.body,id)
  res.redirect('/students')
})





module.exports = router;
