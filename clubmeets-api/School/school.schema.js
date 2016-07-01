var mongoose = require('mongoose');

module.exports = mongoose.model('user',{
  _id : String,
  name : String,
  picture: Buffer
});
