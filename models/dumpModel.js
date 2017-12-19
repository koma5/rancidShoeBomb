'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DumpSchema = new Schema({
	landfill: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Landfill',
    required: 'link to a landfill is required'
	}
});

module.exports = mongoose.model('Dump', DumpSchema);
