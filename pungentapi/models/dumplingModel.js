'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DumplingSchema = new Schema({
	name: {
		type: String
	},
    landfill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Landfill',
   }
});

module.exports = mongoose.model('Dumpling', DumplingSchema);
