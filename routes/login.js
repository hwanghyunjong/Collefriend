var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var dateFormat = require('dateformat');

var firebaseConfig = {
	apiKey: "AIzaSyBk05Mc1934883sY06pTT20l-zAe2m0InA",
	authDomain: "collefriends.firebaseapp.com",
	databaseURL: "https://collefriends.firebaseio.com",
	projectId: "collefriends",
	storageBucket: "collefriends.appspot.com",
	messagingSenderId: "845516350469",
	appId: "1:845516350469:web:832b984284d3549ce0e86c",
	measurementId: "G-P5RBZT6326"
  };
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

router.get('/',  (req, res) => { 
	if (req.session.userid) {
		res.redirect('/main')
	} else {
		res.render('../views/login.ejs');
	}
});

router.route('/').post(function(req, res) {
	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;
	
	firebase.auth().signInWithEmailAndPassword(paramId, paramPassword)
		.then(function(firebaseUser) {
			var docUserinfo = db.collection('students').doc(`userinfo(${paramId})`);
			var doc = docUserinfo.get()
				.then(doc => {
					var userid = doc.data().id;
					var username = doc.data().name;
					req.session.userid=userid;
					req.session.username=username;
					// console.log(req.session.userid);
					res.redirect('/main');
				})
				.catch(err => {
					console.log('Error getting documents', err)
				})
		})
		.catch(function(err) {
			res.redirect('/login');
		});
					
		
});


module.exports = router;
