var user = require('./user.schema');

module.exports = function(app){

  app.get('/user/:userId', function(req, res){
    user.findOne({'userId':req.params.userId},'name picture schoolId clubs' ).then(function(err, user){
      if(err){
        res.send(err);
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

  app.put('/user', function(req, res){
    var newUser;
    user.findOne({_id:req.body._id}).then(function(err, user){
      if(err){
        res.send(err);
      }
      newUser.name = req.body.name || user.name;
      newUser.picture = req.body.picture || user.picture;
      newUser.schoolId = req.body.schoolId || user.schoolId;
      newUser.clubs = req.body.clubs || user.clubs;
      newUser.password = req.body.password || user.password;
    });
    user.update({_id:req.body._id}, {$set:newUser}).then(function(err, user){
      if(err){
        res.send(err);
      }
      res.json(user);
    });
  });

  app.delete('/user', function(req, res)){
    user.remove({_id:req.body._id}, function(err){
      if (err){
        res.send(err);
      }else{
        res.status(200).send("deleted");
      }
    });
  }
}
