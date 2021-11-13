const mongoose = require('mongoose');

const User = mongoose.Schema({
	fullname         : { type: String },
	phone            : { type: String },
	email            : { type: String },
	country          : { type: String },
	favouriteCuisine : [ String ],
	ordersCount      : { type: Number, default: 0 },
	isDeleted        : { type: Boolean, default: false },
	createdAt        : { type: Date, default: Date.now },
	updatedAt        : { type: Date, default: Date.now },
});

User.pre('save', function(next) {
	this.updatedAt = new Date();
	next();
});

module.exports = mongoose.model('User', User);

