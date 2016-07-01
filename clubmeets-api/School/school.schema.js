var mongoose = require('mongoose');

module.exports = mongoose.model('school',{
  _id : String,
  name : String,
  picture: Buffer
});
