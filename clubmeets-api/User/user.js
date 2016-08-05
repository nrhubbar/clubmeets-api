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
  app.get('/user', function (req, res) {
    user.find({},'name email').then(function(users, err) {
      if(err){
        res.status(500).send("Unablw to connect to db");
      }
      res.json(users);
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
    user.findOne({'_id':req.body._id}).then(function(user, err){

      if(err){
        console.log(err)
        res.status(500).send(err);
      }
      user.name = req.body.name || user.name;
      user.picture = req.body.picture || user.picture;
      user.schoolId = req.body.schoolId || user.schoolId;
      user.clubs = req.body.clubs || user.clubs;
      user.password = req.body.password || user.password;
      user.email = req.body.email || user.email;

      user.save().then(function(){
        res.json(user);
      }, function(err){
        if(err){
          console.log(err)
          res.status(500).send(err);
        }
      });

    });
  });

  app.delete('/user/:userId', function(req, res){
    user.remove({_id:req.params.userId}, function(err){
      if (err){
        res.send(err);
      }else{
        res.status(200).send("deleted");
      }
    });
  });
}
