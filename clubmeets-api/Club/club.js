var club = require('./club.schema');
var shortid = require('shortid');

module.exports = function(app){
  app.get('/club/:clubId', function(req, res){
    club.findOne({'_id':req.params.clubId},{name:true, description:true, schoolId:true} ).then(function(err, club){
      if(err) {
        res.send(err);
      }
      res.json(user)
      
    });
  });

  app.post('/club', function(req, res){
    var clubId = shortid.generate();
    club.create({
      name : req.body.name,
      description : req.body.description,
      _id : clubId
    }).then(function(err, club){
      if(err){
        res.send(err);
      }
      res.json({
        clubId:clubId
      });
    });
  });

  app.put('/club', function(req, res){
    var newUser = {};
    club.findOne({'_id':req.body._id}).then(function(club, err){

      if(err){
        console.log(err)
        res.status(500).send(err);
      }
      club.name = req.body.name || club.name;
      club.schoolId = req.body.schoolId || club.schoolId;
      club.description = req.body.description || club.description;

      club.save().then(function(){
        res.json(club);
      }, function(err){
        if(err){
          console.log(err)
          res.status(500).send(err);
        }
      });

    });
  });

  app.delete('/club', function(req, res){
    club.remove({_id:req.body._id}, function(err){
      if (err){
        res.send(err);
      }else{
        res.status(200).send("deleted");
      }
    });
  });
}
