var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var dateFormat = require('dateformat');

router.get('/', (req, res) => {
    res.render('../views/register.ejs');
});

var db = firebase.firestore();

router.post('/', function(req, res) {
    var username = req.body['LastName'];
    var userid = req.body['Id'];
	var userpw = req.body['Password'];
	var usernickname = req.body['nickname'];
	var userschoolname = req.body['schoolname'];

	db.collection('students').doc(`userinfo(${userid})`).set({
		name: username,
		id: userid,
		password: userpw,
		schoolname: userschoolname,
		nickname: usernickname
	})
	.then(function() {
		firebase.auth().createUserWithEmailAndPassword(userid, userpw)
			.then(function(firebaseUser) {
				console.log("Document successfully written!");
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가 성공</h2>');
				res.end();
			})
			.catch(function(err) {
				console.log("Error");
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가  실패</h2>');
				res.end();	
			})
	})
	.catch(function(error) {
		console.error("Error writing document: ", error);
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>사용자 추가  실패2</h2>');
		res.end();
	});
});


module.exports = router;