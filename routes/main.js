var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var dateFormat = require('dateformat');

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

// router.post('/sub', (req, res) => {
//     var title = req.body.boardtitle;
//     var board = req.body.board;
//     var boardimg = req.body.boardimg;

//     db.collection(`board(${req.session.userid})`).doc().set({
//         title: title,
//         board: board,
//         boardimg: boardimg
//     })
//     .then(function() {
//         res.send('<script type="text/javascript">alert("게시판 추가 완료!");</script>');
//         res.redirect('/main');
//     })
// });

router.post('/submit', (req, res) => {
    console.log(req.body)
    console.log(req.session)
    res.json({
        result:"ok"
    })
});

module.exports = router;