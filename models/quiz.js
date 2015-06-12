/*jshint node: true */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var kittySchema = new Schema({
    name:String
    
});

module.exports = mongoose.model("kitty", kittySchema);