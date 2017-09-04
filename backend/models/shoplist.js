var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var IngrList=new Schema({
  name:String,
  amount:Number,
  belongsTo:String,
  unit:String
},{  timestamps: true
});

module.exports = mongoose.model('IngrList',IngrList);
