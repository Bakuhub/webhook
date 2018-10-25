var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recordSchema = new Schema({
    reciver:{
        type:String,
        required:true
    },sender:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },


});


const  Record = module.exports = mongoose.model('record',recordSchema);    