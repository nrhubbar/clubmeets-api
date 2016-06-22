var user = require('./user.schema');
var shortid = require('shortid');

module.exports = function(app){
  app.get('/user/:userId', function(req, res){
    user.findOne({'_id':req.params.userId},{name:true, picture:true, schoolId:true, clubs:true} ).then(function(err, user){
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
    var newUser = {};
    user.findOne({'_id':req.body._id},function(err, userdb){

      newUser.name = req.body.name || userdb.name;
      newUser.picture = req.body.picture || userdb.picture;
      newUser.schoolId = req.body.schoolId || userdb.schoolId;
      newUser.clubs = req.body.clubs || userdb.clubs;
      newUser.password = req.body.password || userdb.password;

      user.update({'_id':req.body._id}, {$set : newUser}, function(err, dbRes){
        res.json(newUser);
      });
    });
  });

  app.delete('/user', function(req, res){
    user.remove({_id:req.body._id}, function(err){
      if (err){
        res.send(err);
      }else{
        res.status(200).send("deleted");
      }
    });
  });

  app.get('*', function(req, res){
    res.send();
  });
}
