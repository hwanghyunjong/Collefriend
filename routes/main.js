var express = require('express');
var router = express.Router();
var path = require('path');
var mongodb = require('mongodb');

var app = express();

var database;

function connectDB() {
	var databaseUrl = 'mongodb://localhost:27017/students';

	mongodb.connect(databaseUrl, function(err, db) {
		if (err) throw err;

		console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);

		database = db;
	});
};

router.get('/', (req, res) => {
    connectDB();

    res.sendFile(path.join(__dirname, '../views/mainpage/index.html'));
});

router.post('/', (req, res) => {

});

module.exports = router;