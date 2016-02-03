var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rbs');
exports.mongoose = mongoose;