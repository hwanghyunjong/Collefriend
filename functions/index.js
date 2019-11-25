const functions = require('firebase-functions');
const engines = require('consolidate');
const firebase = require('firebase-admin');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var engine = require('ejs-locals');

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

var loginRouter = require('./routes/login');
var joinRouter = require('./routes/signup');
var mainRouter = require('./routes/main');
var logoutRouter = require('./routes/logout');
var profileRouter = require('./routes/profile');

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 60 * 60
	}
}));

app.get('/', function(req, res, next) {
	res.redirect('/login');
	console.log(req.session);
});

app.use('/login', loginRouter);
app.use('/signup', joinRouter);
app.use('/main', mainRouter);
app.use('/logout', logoutRouter);
app.use('/profile', profileRouter);

app.use("/", express.static(path.join(__dirname,"./views")))

app.engine('ejs', engine);

exports.app = functions.https.onRequest(app);