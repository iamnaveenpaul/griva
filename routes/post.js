const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const log = require('../log');
const mongoose = require('mongoose');

router.post('/save', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  var data = req.body;
  if(data){
    User.getUserById(mongoose.Types.ObjectId(req.user.id),function(err_u,userProfile){
      let response = { success: true };
      response.msg = 'Successfully saved posts';

      var uName = userProfile.username.replace(/\s+/g, '-');

      var post = new Post({
        userEmailId: userProfile.userEmailId,
        title: data.title,
        url: data.title.replace(/\s+/g, '-')+"-"+uName,
        text: data.text,
        academy: data.academy,
        date: new Date(),
        votes: 0,
        views: 0,
        author: userProfile.username,
        categories: data.categories
      })

      Post.addPost(post, (err, result) => {
        
        if(err){
          response.msg = "Something failed while saving post..."
        }

        res.json(response);
      });
    });
  } else {
    response.msg = "No data found..."
  }
});

router.get('/get/all', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  let response = { success: true };
  response.msg = 'Successfully saved posts';

  User.getUserById(mongoose.Types.ObjectId(req.user.id),function(err_u,userProfile){
    Post.getPosts(userProfile.userEmailId,function(err, posts){
      if(err){
        response.msg = "Something failed while saving post..."
      }

      res.json(posts);
    });
  });
});

router.get('/academy/articles/:id', (req, res, next) => {

  Post.getPostsByUrl(req.params.id,function(err, post){
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

router.post('/update/stats', (req, res, next) => {

  var query = {_id:mongoose.Types.ObjectId(req.body._id)},
      update = { $inc:{views:1}};

  if(req.body.upvote){
    update = { $inc:{votes:1}}
  }

  Post.updateCustomQuery(query,update,function(err, posts){
    if(err){
      response.msg = "Something failed while saving post..."
    }

    res.json(posts);
  });
});

router.get('/academy', (req, res, next) => {

  var skip = 0,
      limit = 0,
      academy = req.query.academy;

  if(req.query.skip){
    skip = req.query.skip
  }

  if(req.query.limit){
    limit = req.query.limit
  }

  Post.getLatestPostsByAcademy(skip,limit,academy,function(err, posts){

    if(err){
      response.msg = "Something failed while saving post..."
    }

    res.json(posts);
  });
});

router.get('/academy/hero', (req, res, next) => {

  var skip = 0,
      limit = 0;

  if(req.query.skip){
    skip = req.query.skip
  }

  if(req.query.limit){
    limit = req.query.limit
  }

  Post.getLatestHeroPosts(skip,limit,function(err, posts){

    if(err){
      response.msg = "Something failed while saving post..."
    }

    res.json(posts);
  });
});

module.exports = router;
