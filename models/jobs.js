var mongoose = require('mongoose');

var jobsSchema = mongoose.Schema({
    url: String,
    html: String
});

var Jobs = mongoose.model('Jobs', jobsSchema);
module.exports = Jobs;