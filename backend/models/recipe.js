var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var IngredientSchema=new Schema({
  name:String,
  amount:Number,
  unit:String
});

var recipe=new Schema({
  name:String,
  description:String,
  imagePath:String,
  ingredients:[IngredientSchema],
  addedBy:String
},{
  timestamps: true
});

var recipemodel=mongoose.model('Recipe',recipe);
module.exports = recipemodel;
