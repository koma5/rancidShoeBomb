'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LandfillSchema = new Schema({
	name: {
		type: String,
		required: 'name of the landfill is required'
	},
	opened: {
		type: Date,
		default: Date.now
	}
});

LandfillSchema.index({ 'name': 'text' });

module.exports = mongoose.model('Landfill', LandfillSchema);
