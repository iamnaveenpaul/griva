const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

// user schema
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },profileHandle: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },userEmailId: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },userPhone: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  currentPlan: {
    name: {type:String},
    activatedDate: {type:Date},
    refId: {type:String}
  }
});

UserSchema.statics.getUserByUsername = function(username, callback) {
  let project = {
    project:0,
    password:0
  }
  User.findOne({username: username},project, callback);
}

UserSchema.statics.getUserById = function(id, callback) {
  User.findById(id, callback);
}

UserSchema.statics.getUserByUserEmailId = function(userEmailId, callback) {
  let query = {userEmailId: userEmailId};
  User.findOne(query, callback);
}

UserSchema.statics.updateProfile = function(findQ, updateQ, callback) {
  User.update(findQ, updateQ, callback);
}

UserSchema.statics.findByProfileHandle = function(profileHandle, callback) {
  let query = {profileHandle: profileHandle};
  User.findOne(query, callback);
}

UserSchema.statics.getUsers = () => {
  return User.find({}, '-password');
}

UserSchema.statics.addUser = function(newUser, callback) {
  User.getUserByUserEmailId(newUser.userEmailId, (err, user) => {
    if (err) return callback({msg: "There was an error on getting the user"});
    if (user) {
      let error = {msg: "EmailId is already in use"};
      return callback(error);
    } else {
      bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(newUser.password, salt, (err, hash) => {
          if (err) return callback({msg: "There was an error registering the new user"});

          newUser.password = hash;
          newUser.save(callback);
        });
      });
    }
  });
};

UserSchema.statics.authenticate = function(userEmailId, password, callback) {
  User.getUserByUserEmailId(userEmailId, (err, user) => {
    if (err) return callback({msg: "There was an error on getting the user"});
    if (!user) {
      let error = {msg: "Wrong emailId or password"};
      return callback(error);
    } else {
      bcryptjs.compare(password, user.password, (err, result) => {
        if (result == true) {
          return callback(null, user);
        } else {
          let error = {msg: "Wrong username or password"};
          return callback(error);
        }
      });
    }
  });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
