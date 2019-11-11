var express = require('express');
var router = express.Router();
var path = require('path');
var firebase = require('firebase');

var app = express();

router.get('/', (req, res) => {
    req.session.destroy();
    res.redirect('/main');
})

router.post('/', (req, res) => {

});


module.exports = router;
