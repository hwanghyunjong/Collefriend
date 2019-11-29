var express = require('express');
var router = express.Router();
var path = require('path');
var firebase = require('firebase');
var dateFormat = require('dateformat');

var app = express();

var db = firebase.firestore();

function generate_random_string(string_length){
    let random_string = '';
    let random_ascii;
    for(let i = 0; i < string_length; i++) {
        random_ascii = Math.floor((Math.random() * 25) + 97);
        random_string += String.fromCharCode(random_ascii)
    }
    return random_string
}

router.get('/',function(req, res, next) {
    if(!req.session.userid) {
        res.redirect("/login")
    } else {
        var docUserinfo = db.collection('students').doc(`userinfo(${req.session.userid})`);
        var doc = docUserinfo.get()
            .then(doc => {
                var name = doc.data().name;
                var nickname = doc.data().nickname;
                var department = doc.data().department;
                var schoolname = doc.data().schoolname;

                res.render('../views/boardwirte.ejs', {
                    name :  name,
                    username : nickname,
                    userid : req.session.userid,
                    department : department,
                    school : schoolname
                });
            })
            .catch((err) => {
                console.log('Error getting documents', err);
            })
        }           
});

router.post('/', (req, res) => {
    var bodytitle = req.body.title || req.query.title;
    var bodycontent = req.body.content || req.query.content;
    var bodybrddate = Date.now();
    var bodybrdno = generate_random_string(8);
    var bodyuser = req.session.username;

    db.collection('freeboard').doc(bodybrdno).set({
        brddate : bodybrddate,
        brdmemo : bodycontent,
        brdno : bodybrdno,
        brdtitle : bodytitle,
        brdwriter : bodyuser
    })
    .then(function() {
        console.log("추가 성공");
    })
    .catch(function(err) {
        console.error("Error writing document: ", err);
    })

});


module.exports = router;