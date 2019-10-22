var express = require('express');
var router = express.Router();
var path = require('path');
var mongodb = require('mongodb');
var fs = require('fs');

var app = express();

var database;

// const mimeType = {
// 	'.ico': 'image/x-icon',
// 	'.html': 'text/html',
// 	'.js': 'text/javascript',
// 	'.css': 'text/css',
// 	'.png': 'image/png',
// 	'.jpg': 'image/jpeg',
// 	'.eot': 'appliaction/vnd.ms-fontobject',
// 	'.ttf': 'aplication/font-sfnt'
//   }

// const ext = path.parse(req.url).ext;
// const imagepath = path.join(__dirname, '../views/images')

function connectDB() {
	var databaseUrl = 'mongodb://localhost:27017/students';

	mongodb.connect(databaseUrl, function(err, db) {
		if (err) throw err;

		console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);

		database = db;
	});
};


router.get('/',  (req, res) => { 
	connectDB();
	
    res.sendFile(path.join(__dirname, '../views/login.html'));
	console.log('로그인 창 구현');
});

router.route('/').post(function(req, res) {
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
	
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);
    
	if (database) {
		authUser(database, paramId, paramPassword, function(err, docs) {
			if (err) {throw err;}
			
			if (docs) {
				console.dir(docs);

				var username = docs[0].name;

				res.redirect('/main');
			} else {  
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>로그인  실패</h1>');
				res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
				res.write("<br><br><a href='/login'>다시 로그인하기</a>");
				res.end();
			}
		});
	} else {  
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
		res.end();
	}
	
});

app.use('/', router);

var authUser = function(database, id, password, callback) {
	console.log('authUser 호출됨 : ' + id + ', ' + password);
	
    // users 컬렉션 참조
	var users = database.collection('users');

    // 아이디와 비밀번호를 이용해 검색
	users.find({"id":id, "password":password}).toArray(function(err, docs) {
		if (err) { // 에러 발생 시 콜백 함수를 호출하면서 에러 객체 전달
			callback(err, null);
			return;
		}
		
	    if (docs.length > 0) {  // 조회한 레코드가 있는 경우 콜백 함수를 호출하면서 조회 결과 전달
	    	console.log('아이디 [%s], 패스워드 [%s] 가 일치하는 사용자 찾음.', id, password);
	    	callback(null, docs);
	    } else {  // 조회한 레코드가 없는 경우 콜백 함수를 호출하면서 null, null 전달
	    	console.log("일치하는 사용자를 찾지 못함.");
	    	callback(null, null);
	    }
	});
}

module.exports = router;
