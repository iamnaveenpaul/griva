const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
  CourseEmailId: {
    type: String,
    required: true,
    trim: true
  },
  plan: {type: String},
  amount: {type: Number},
  activatedDate: {type: Date},
  validTill: {type: Date},
  discount: {type: Number},
  txnId: {type: String},
  coupon: {type: String}
});

CourseSchema.statics.getCourseByUserEmailId = function(userEmailId, callback) {
  let query = {userEmailId: userEmailId};
  Course.findOne(query, callback);
}

CourseSchema.statics.getCourses = () => {
  return Course.find({});
}

CourseSchema.statics.addCourse = function(newCourse, callback) {
};

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
