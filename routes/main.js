var express = require('express');
var router = express.Router();
var firebase = require('firebase');

var app = express();

var db = firebase.firestore();

router.get('/', (req, res) => {
    if(!req.session.userid){
        res.redirect("/login")
    } else {
        var docUserinfo = db.collection('students').doc(`userinfo(${req.session.userid})`);
        var doc = docUserinfo.get()
            .then(doc => {
                var name = doc.data().name;
                var nickname = doc.data().nickname;
                res.render('../views/index.ejs', {
                    name :  name,
                    username : nickname
                });
            })
            .catch(err => {
                console.log('Error getting documents', err)
            })
    }
});

router.post('/submit', (req, res) => {
    console.log(req.body)
    console.log(req.session)
    res.json({
        result:"ok"
    })
});

module.exports = router;