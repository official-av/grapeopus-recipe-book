var mongoose=require('mongoose');
var Schema=mongoose.Schema;
passportLocalMongoose = require('passport-local-mongoose');

var User=new Schema({
  username:String,
  password:String,
  firstname:String,
  lastname:String,
  admin:{
    type:Boolean,
    default:false
  }
});

User.plugin(passportLocalMongoose);
var usermodel=mongoose.model('User',User);
module.exports = usermodel;
