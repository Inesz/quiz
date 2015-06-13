/*jshint node: true */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    nrPytania : Number,
    punkty : Number,
    kategoria : String,
    pytanie : String,
    odpowiedzi : Array,
    poprawnaOdp : String,
    opis : String,
});

module.exports = mongoose.model("question", questionSchema);

/*
var kittySchema = new Schema({
    name:String   
});

module.exports = mongoose.model("kitty", kittySchema);
*/
