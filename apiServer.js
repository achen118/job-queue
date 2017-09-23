var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/jobqueue');

var Jobs = require('./models/jobs');

app.post('/jobs', function(req, res) {
  var job = req.body;
  Jobs.create(job, function(err, jobs) {
    if (err) {
      throw err;
    }
    res.json(jobs);
  });
});

app.get('/jobs', function(req, res) {
  Jobs.find(function(err, jobs) {
    if (err) {
      throw err;
    }
    res.json(jobs);
  });
});

app.delete('/jobs/:_id', function(req, res) {
  var query = { _id: req.params._id };
  Jobs.remove(query, function(err, jobs) {
    if (err) {
      throw err;
    }
    res.json(jobs);
  });
});

app.put('/jobs/:_id', function(req, res) {
  var job = req.body;
  var query = { _id: req.params._id };
  var update = {
    '$set': {
      html: job.html
    }
  };
  var options = { new: true };
  Jobs.findOneAndUpdate(query, update, options, function(err, jobs) {
    if (err) {
      throw err;
    }
    res.json(jobs);
  });
});

app.listen(3001, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log("listening on port 3001");
});