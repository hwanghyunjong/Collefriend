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

    res.sendFile(path.join(__dirname, '../views/signup.html'));
});

router.post('/', function(req, res) {
    var username = req.body['name'];
    var userid = req.body['Id'];
    var userpw = req.body['mbpw'];
    
    if (database) {
        addUser(database, userid, userpw, username,
            function (err, result) {
                if (err) {
                    res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" });
                    res.write('<h1>에러발생</h1>');
                    res.end();
                    return;
                }
                if (result) {
                    console.dir(result);
                    res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" });
                    res.write('<h1>Add Success</h1>');
                    res.write('<h1> name </h1>' + userid);
                    res.write('<br><a href="/login"> 다시로그인하기! </a>');
                    res.end();
                }
                else {
                    console.log('추가 안됨 Error!!!');
                    res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" });
                    res.write('<h1>can not add user</h1>');
                    res.write('<a href="/login"> 다시로그인하기! </a>');
                    res.end();
                }
            }
        )
    }
    else {
        console.log('DB 연결 안됨');
        res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" });
        res.write('<h1>databasae 연결 안됨</h1>');
        res.end();
    }
});

var addUser = function(database, id, password, name, callback) {
    var users = database.collection('users');

    users.insertMany([{ "id": id, "password": password, "name": name}],
        function (err, result) {
            if (err) {
                callback(err, null);
                return;
            }

            if (result.insertedCount > 0) {
                console.log('사용자 추가 됨' + result.insertedCount);
                callback(null, result);
            }
            else {
                console.log('사용자 추가 안됨' + result.insertedCount);
                callback(null, null);
            }
        }
    );
};

module.exports = router;