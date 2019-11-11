var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    name: String,
    nickname: String,
    schoolname: String
});

module.exports = mongoose.model('users', userSchema);