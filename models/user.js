var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var userSchema = new Schema({
    username: String,
    password: String
});
var User = mongodb.mongoose.model("students", userSchema);
var UserDAO = function(){};
UserDAO.prototype.save = function(obj, callback) {
    var instance = new User(obj);
    instance.save(function(err){
        callback(err);
    });
};
UserDAO.prototype.find = function(obj, callback) {
    if (obj) {
        User.find(obj,function(err, data){
            if (err) {
                callback(err);
            } else {
                callback(null, data);
            }
        });
    } else {
        User.find(function(err, data){
            if (err) {
                callback(err);
            } else {
                callback(null, data);
            }
        });
    }
    
};
module.exports = new UserDAO();