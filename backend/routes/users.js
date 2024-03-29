var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var Verify=require('../verify');

router.route('/').get(/*admin verify*/Verify.verifyOrdinaryUser,function (req,res,next) {
  User.find({})
    .exec(
      function (err, user) {
        if (err) {
          return res.status(500).json({
          title: 'Couldn\'t fetch the Users!',
          error: err
        });
        }
        res.json(user);
      });
});

router.route('/register').post(function(req, res, next) {
  User.register(new User({
    username:req.body.username
  }),req.body.password,function (err, user) {
    if (err) {
      return res.status(500).json({
      title: 'Registration Failed',
      error: err
    });
    }
    if (req.body.firstname) {
      user.firstname = req.body.firstname;
    }
    if (req.body.lastname) {
      user.lastname = req.body.lastname;
    }

    user.save(function (err, user) {
      passport.authenticate('local')(req, res, function () {
        return res.status(200).json({
          status: 'Registration Successful!'
        });
      });
    });

    });
  });

router.route('/login').post(function (req,res,next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return res.status(401).json({
        title: 'Login Failed !',
        error: {message: 'Invalid login credentials'}
      });
    }
    if (!user) {
        return res.status(401).json({
          title: 'Login Failed !',
          error: {message: 'Invalid login credentials'}
        });
      }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({
          title: 'Login Failed !',
          error: {message: 'Invalid login credentials'}
        });
      }/*
      console.log('User in users: ', user);
*/
      var token = Verify.getToken(user);
      res.status(200).json({
        status: 'Login Successful',
        success: true,
        token: token,
        userId:user._id
      });
    });
  })(req, res, next);
});

router.get('/logout', function (req, res) {
  req.logout();
  res.status(200).json({
    status: 'bye'
  });
});


module.exports = router;
