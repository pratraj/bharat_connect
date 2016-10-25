var mongoose = require ('mongoose');
var UserSchema   = new mongoose.Schema(
	{
		"user_name":String,
		"password":String
	}
);

module.exports = mongoose.model('User', UserSchema);
