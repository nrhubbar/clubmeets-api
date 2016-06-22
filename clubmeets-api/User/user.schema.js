var mongoose = require('mongoose');

module.exports = mongoose.model('user',{
  _id : String,
  name : String,
  email: String,
  password: String,
  picture: Buffer,
  schoolId: String,
  clubs:[String]
});
