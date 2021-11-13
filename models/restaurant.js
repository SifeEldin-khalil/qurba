const mongoose = require('mongoose');

const Restaurant = mongoose.Schema({
	name        : { type: String },
	uniqueName  : { type: String },
	cuisine     : { type: String },
	location    : {
									lat  : { type: String },
									long : { type: String },
  							},
	isDeleted   : { type: Boolean, default:false },
	createdAt   : { type: Date, default: Date.now },
	updatedAt   : { type: Date, default: Date.now },
});

Restaurant.pre('save', function(next) {
	this.updatedAt = new Date();
	next();
});

module.exports = mongoose.model('Restaurant', Restaurant);

