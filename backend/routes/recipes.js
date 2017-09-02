var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipe');
var Verify=require('../verify');
//code for all
router.route('/').post(Verify.verifyOrdinaryUser,function (req, res, next) {
  Recipe.create(req.body, function (err, recipe) {
    if (err) throw err;
    console.log('recipe created');
    var id = recipe._id;
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end('Added the recipe with id:' + id);
  })
}).delete(Verify.verifyOrdinaryUser,function (req, res, next) {
  Recipe.remove({}, function (err, resp) {
    if (err) throw err;
    res.json(resp);
  })
});

//code for urls with ids aka per recipe
router.route('/:recipeId')
  //setting up code for put request
  .put(Verify.verifyOrdinaryUser,function (req, res, next) {
    Recipe.findByIdAndUpdate(req.params.recipeId, {
      $set: req.body
    }, {
      new: true
    }, function (err, recipe) {
      if (err) throw err;
      res.json(recipe);
    });
  })
  //setting up code for delete request
  .delete(Verify.verifyOrdinaryUser,function (req, res, next) {
    Recipe.findByIdAndRemove(req.params.recipeId, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    })
  });

router.route('/:userId').get(Verify.verifyOrdinaryUser,function (req,res,next) {
  Recipe.find({'addedBy':req.params.userId})
    .exec(
      function (err, recipe) {
        if (err) throw err;
        res.json(recipe);
      });
});

module.exports=router;
