var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydbs', {useNewUrlParser: true });
exports.mongoose = mongoose;