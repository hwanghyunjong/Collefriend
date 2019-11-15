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
        //var docUserinfo = db.collection('students').doc(`userinfo(${req.session.userid})`);
        var docBoardinfo = db.collection(`board(${req.session.username})`);
        var docUserinfo = db.collection('student').doc(`userinfo(${req.session.userid})`)
        var doc = docBoardinfo.get()
            .then(doc => {
                
                var resultArray=[]
                doc.forEach((item)=>{
                    console.log(item.data())
                    var data=item.data()
                    resultArray.push({
                        boardtime : data.Date,
                        boardtitle : data.boardtitle,
                        boardmes : data.boardmessage,
                        imgurl : data.imgUrl  
                    })
                })
                var name = '김혁규';
                var nickname = 'Deft';
                // var boardtime = doc.data().Date;
                // var boardtitle = doc.data().boardtitle;
                // var boardmes = doc.data().boardmessage;
                // var imgurl = doc.data().imgUrl;
                console.log(resultArray)
                res.render('../views/index.ejs', {
                    boardList:resultArray,
                    name :  name,
                    username : nickname
                    // boardtime : boardtime,
                    // boardtitle : boardtitle,
                    // boardmes : boardmes,
                    // imgurl11 : imgurl
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