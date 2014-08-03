'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
  res.render('home');
});

app.get('/calc', function(req,res){
  res.render('calc');
});

app.post('/calc', function(req,res){
  console.log(req.body);
  var operator = req.body.operator;
  var result;
  switch (operator) {
    case '-':
      result = (req.body.x * 1) - (req.body.y *1);
      break;
    case '+':
      result = (req.body.x * 1) + (req.body.y * 1);
      break;
    case '*':
      result = (req.body.x * 1) * (req.body.y * 1);
      break;
    case '/':
      result = (req.body.x * 1) / (req.body.y * 1);
  }

  var obj = { result:result, operator:operator, x:req.body.x, y:req.body.y};
  res.render('calc', obj);
});

app.get('/boxes', function(req,res){
  res.render('boxes');
});

app.post('/boxes', function(req,res){
  console.log(req.body);

  //colors
  var colors = req.body.colors;
  var colorArr = colors.split(',');

  //generate how many? boxes
  var boxCount = req.body.boxes * 1;

  //width
  var wRange = req.body.width.split('-');
  wRange = wRange.map(function(x){return x*1;});
  //height
  var hRange = req.body.height.split('-');
  hRange = hRange.map(function(x){return x*1;});

  var boxes = [];

  for(var i=0; i<boxCount; i++){
    var height, width, color;
    height = Math.floor(Math.random()*(hRange[1]-hRange[0]))+hRange[0];
    width = Math.floor(Math.random()*(wRange[1]-wRange[0]))+wRange[0];
    color = colorArr[Math.floor(Math.random()*colorArr.length)].trim();

    boxes.push({height: height, width: width, color: color});
  }

  var obj = { boxes:boxes };

  res.render('boxes2', obj);
});

app.get('/boxes2', function(req,res){
  res.render('boxes2');
});

var port = process.env.PORT;
app.listen(port, function(){
  console.log('listening on', port);
});
