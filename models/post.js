const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  userEmailId: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {type: Date},
  academy: {type: String},
  author: {type: String},
  categories: [],
  votes: {type: Number},
  views: {type: Number}
});

PostSchema.statics.addPost = (post, callback) => {
  post.save(callback);
};

PostSchema.statics.getPosts = (userEmailId,callback) => {
  Post.find({userEmailId:userEmailId}, callback);
};

PostSchema.statics.getPostsByUrl = (url,callback) => {
  Post.findOne({url:url}, callback);
};

PostSchema.statics.updateCustomQuery = (query,update,callback) => {
  Post.update(query,update, callback);
};

PostSchema.statics.getLatestPostsByAcademy= (skip,limit,academy,callback) => {

  if(!skip){
    skip = 0;
  }

  if(!limit){
    limit = 50;
  }

  Post.find({academy:academy}).sort({date: 1}).skip(skip).limit(limit).exec(callback);
};

PostSchema.statics.getLatestHeroPosts = (skip,limit,callback) => {

  if(!skip){
    skip = 0;
  }

  if(!limit){
    limit = 4;
  }

  Post.find().sort({date: -1}).skip(skip).limit(limit).exec(callback);
};

PostSchema.statics.getPostsByConv = (id, callback) => {
  Post.find({conversationId: id}, callback);
};

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
