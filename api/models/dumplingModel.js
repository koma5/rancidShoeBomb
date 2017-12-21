'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DumplingSchema = new Schema({
	name: {
		type: String
	},
	dump: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Dump',
    required: 'link to a dump is required'
	}
});

module.exports = mongoose.model('Dumpling', DumplingSchema);
