var express = require('express');
var router = express.Router();
var IngrList = require('../models/shoplist');
var Verify = require('../verify');

//routes for creating ingredients and deleting all ingredients
router.route('/').post(Verify.verifyOrdinaryUser, function (req, res, next) {
  IngrList.create(req.body, function (err, ingredient) {
    if (err) {
      return res.status(500).json({
        title: 'Couldn\'t add the ingredient!',
        error: err
      });
    }
    if(ingredient){var id= ingredient._id;}

    return res.status(200).json({
      status: 'Added ingredient',
      ingrID: id
    });
  })
});

//route for updating ingredient with ingrID
router.route('/:ingrID').put(Verify.verifyOrdinaryUser, function (req, res, next) {
  IngrList.findByIdAndUpdate(req.params.ingrID, {
    $set: req.body
  }, {
    new: true
  }, function (err, ingredient) {
    if (err) {
      return res.status(500).json({
        title: 'Couldn\'t update the ingredient!',
        error: err
      });
    }
    res.json(ingredient);
  });
})
//route for deleting ingredient with ingrID
  .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    IngrList.remove({'_id': req.params.ingrID}, function (err, resp) {
      if (err) {
        return res.status(500).json({
          title: 'Couldn\'t delete the ingredients!',
          error: err
        });
      }
      res.json(resp);
    })
  });

router.route('/:userID').get(Verify.verifyOrdinaryUser, function (req, res, next) {
  IngrList.find({'belongsTo': req.params.userID})
    .exec(
      function (err, recipe) {
        if (err) {
          return res.status(500).json({
            title: 'Couldn\'t fetch the ingredients !',
            error: err
          });
        }
        res.json(recipe);
      });
});

router.route('/all/:userID').delete(Verify.verifyOrdinaryUser,function (req,res,next) {
  IngrList.remove({'belongsTo': req.params.userID}, function (err, resp) {
    if (err) {
      return res.status(500).json({
        title: 'Couldn\'t delete the ingredients!',
        error: err
      });
    }
    res.json(resp);
  })})

module.exports = router;
