const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var session = require('express-session');



app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname+'/views');



var expressValidator = require('express-validator');
app.use(expressValidator());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var methodOverride = require('method-override');

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
 
app.use(cookieParser('keyboard cat'))
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(flash());

var options = {
  dotfiles: 'ignore',
  etag: true,
  extensions: ['htm', 'html'],
  index: 'index.html',
  lastModified: true,
  maxAge: '1d',
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
    res.header('Cache-Control', 'public, max-age=1d');
  }
};




 router.get('/',function(req,res){
   res.sendFile(path.join(__dirname+'/src/index.html'));
   //__dirname : It will resolve to your project folder.
});

 router.get('/whitepaper',function(req,res){
   res.sendFile(path.join(__dirname+'/src/whitepaper.html'));
   //__dirname : It will resolve to your project folder.
});

 router.get('/demo',function(req,res){
   res.sendFile(path.join(__dirname+'/src/demo.html'));
});

 router.get('/404',function(req,res){
   res.sendFile(path.join(__dirname+'/src/404.html'));
});

 router.get('/500',function(req,res){
   res.sendFile(path.join(__dirname+'/src/500.html'));
});


 router.get('/roadmap',function(req,res){
   res.sendFile(path.join(__dirname+'/src/roadmap.html'));
});

//add the router
 app.use('/', router);
 
 app.use(express.static(__dirname + '../src'));


 app.use('/', express.static(__dirname + '/src', options));
app.use(function(req, res, next) {
  res.status(404).redirect('/404');
  res.status(500).redirect('/500');
});
 app.use('*', express.static(__dirname + '/src', options));

  
 
  app.listen(process.env.port || 80);

 console.log('Running at Port 80');