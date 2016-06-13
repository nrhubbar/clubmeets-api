var user = require('./user.schema');

module.exports = function(app){

  app.get('/user/:userId', function(req, res){
    user.findOne({'userId':req.params.userId},'name picture schoolId clubs' ).then(function(err, user){
      if(err){
        res.send(err)
      }
      res.json(user);
    });
  });

  app.post('/user', function(req, res){
    var userId = shortid.generate();
    user.create({
      name : req.body.name,
      email : req.body.email,
      password : req.body.password,
      _id : userId
    }).then(function(err, user){
      if(err){
        res.send(err);
      }
      res.json({
        userId:userId
      });
    });
  });
}
