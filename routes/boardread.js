var express = require('express');
var router = express.Router();
var path = require('path');
var firebase = require('firebase');
var dateFormat = require('dateformat');

var app = express();

var db = firebase.firestore();

router.get('/',function(req, res, next) {
    db.collection('freeboard').doc(req.query.brdno).get()
        .then((doc) => {
            var childData = doc.data();
             
            childData.brddate = dateFormat(childData.brddate,"yyyy-mm-dd hh:mm");
            res.render('../views/freeboard.ejs', {
                row: childData
            });
        })
});

router.post('/', (req, res) => {

});


module.exports = router;