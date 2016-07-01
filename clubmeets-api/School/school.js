var school = require('./school.schema');
var shortid = require('shortid');

module.exports = function(app){
  app.get('/school/:schoolId', function(req, res){
    school.findOne({'_id':req.params.schoolId},{name:true, picture:true} ).then(function(err, school){
      if(err){
        res.send(err);
      }
      res.json(school);
    });
  });

  app.post('/school', function(req, res){
    var schoolId = shortid.generate();
    school.create({
      name : req.body.name,
      _id : schoolId
    }).then(function(err, school){
      if(err){
        res.send(err);
      }
      res.json({
        schoolId:schoolId
      });
    });
  });

  app.put('/school', function(req, res){
    var newUser = {};
    school.findOne({'_id':req.body._id}).then(function(school, err){

      if(err){
        console.log(err)
        res.status(500).send(err);
      }
      school.name = req.body.name || school.name;
      school.picture = req.body.picture || school.picture;
      school.save().then(function(){
        res.json(school);
      }, function(err){
        if(err){
          console.log(err)
          res.status(500).send(err);
        }
      });

    });
  });

  app.delete('/school', function(req, res){
    school.remove({_id:req.body._id}, function(err){
      if (err){
        res.status(500).send(err);
      }else{
        res.status(200).send("deleted");
      }
    });
  });

  app.get('*', function(req, res){
    res.send();
  });
}
