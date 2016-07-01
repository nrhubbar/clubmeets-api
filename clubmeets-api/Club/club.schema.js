var mongoose = require('mongoose');

module.exports = mongoose.model('club',{
  _id : String,
  name : String,
  description : String,
  schoolId: String
});
