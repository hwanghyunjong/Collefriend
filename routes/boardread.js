var express = require('express');
var router = express.Router();
var path = require('path');
var firebase = require('firebase');
var dateFormat = require('dateformat');

var app = express();

var db = firebase.firestore();

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
                req.session.userno=req.query.brdno;

                db.collection('freeboard').doc(req.query.brdno).get()
                    .then((doc) => {
                        var childData = doc.data();
                        
                        childData.brddate = dateFormat(childData.brddate,"yyyy-mm-dd hh:mm");
                        res.render('../views/boardread.ejs', {
                            name :  name,
                            username : nickname,
                            userid : req.session.userid,
                            department : department,
                            school : schoolname,
                            row: childData
                        })
                        .catch((err) => {
                            console.log('Error getting documents', err);
                        });
                    })
                })
                .catch(err => {
                    console.log('Error getting documents', err)
                })
            }
});

// router.get('/boardelete', (req, res) => {
//     db.collection('freeboard').doc(req.query.brdno).delete()
 
//     res.redirect('board');
// });

router.post('/', (req, res) => {

});


module.exports = router;