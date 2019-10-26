const express = require('express');
const router = express.Router();
const User = require('../models/user');
const EmailSMS = require('../middleware/emailSMS');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const log = require('../log');
const mongoose = require('mongoose');

const emailSMSObj = new EmailSMS();

router.get('/register', (req, res, next) => {
  emailSMSObj.sendMail();
  res.send("OK");
});

router.post('/register', (req, res, next) => {
  let response = { success: false };
  if (!(req.body.password == req.body.confirmPass)) {
    let err = "The passwords don't match";
    return next(err);
  } else {

    var newProfileHandle = req.body.userEmailId.replace(/@.*$/,"")

    User.findByProfileHandle(newProfileHandle, (err, existingUser) => {
      if(existingUser && existingUser.profileHandle){
        newProfileHandle = newProfileHandle
      }

      let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        userEmailId: req.body.userEmailId,
        userPhone: req.body.userPhone,
      });

      User.addUser(newUser, (err, user) => {
        if (err) {
          response.msg = err.msg || 'Failed to register user';
          res.json(response);
        } else {
          response.success = true;
          response.msg = 'User registered successfuly';
          response.user = {
            id: user._id,
            username: user.username,
          };

          emailSMSObj.sendMail(req.body.userEmailId);

          res.json(response);
        }
      });
    });
  }
});

router.post('/authenticate', (req, res, next) => {
  let body = req.body;
  let response = { success: false };

  User.authenticate(body.userEmailId.trim(), body.password.trim(), (err, user) => {
    if (err) {
      response.msg = err.msg;
      res.json(response);
    } else {
      // create the unique token for the user
      let signData = {
        id: user._id,
        username: user.username,
        userEmailId: user.userEmailId,
      };
      let token = jwt.sign(signData, config.secret, {
        expiresIn: 604800,
      });

      response.token = 'JWT ' + token;
      response.user = signData;
      response.success = true;
      response.msg = 'User authenticated successfuly';

      console.log('[%s] authenticated successfuly', user.userEmailId);
      res.json(response);
    }
  });
});

// profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let response = { success: true };
    User.getUserById(mongoose.Types.ObjectId(req.user.id),function(err_u,userProfile){

      response.msg = 'Profile retrieved successfuly';
      response.user = userProfile;

      res.json(response);
    });
});

// user list
router.get('/', passport.authenticate('jwt', { session: true }), (req, res, next) => {

  User.getUsers()
    .then(users => {
      let response = {
        success: true,
        users: users,
      };
      return res.json(response);
    })
    .catch(err => {
      log.err('mongo', 'failed to get users', err.message || err);
      return next(new Error('Failed to get users'));
    });
});

router.post('/profile/save', passport.authenticate('jwt', { session: true }), (req, res, next) => {
  let response = { success: true }

  let findQ = {
    _id:mongoose.Types.ObjectId(req.body._id)
  }
  ,updateQ = {
    $set:{
      profileHandle: req.body.profileHandle,
      username: req.body.username,
      userEmailId: req.body.userEmailId,
      userPhone: req.body.userPhone
    }
  }

  User.updateProfile(findQ, updateQ, function(err_u,results){
    response.msg = 'Profile ssaved successfuly';
    res.json(response);
  });
});

router.get('/tutor/:id', (req, res, next) => {

  User.getPostsByUrl(req.params.id,function(err, post){
    if(err){
      response.msg = "Something failed while saving post..."
    }

    res.json(post);

    if(post && post._id){
      var query = {_id:mongoose.Types.ObjectId(post._id)},
          update = { $inc:{views:1}};
      Post.updateCustomQuery(query,update,function(err, posts){});
    }
  });
});

module.exports = router;
