var express = require('express');
var http = require('http'); 
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var loginRouter = require('./routes/login');
var joinRouter = require('./routes/signup');
var mainRouter = require('./routes/main');

var app = express();

app.get('/', function(req, res) {
    res.redirect('/login');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

app.use('/login', loginRouter);
app.use('/login', express.static('images'));
app.use('/signup', joinRouter);
app.use('/main', mainRouter);

app.listen(3000, () => {
    console.log('server start');
})