var mongoose = require('mongoose'),
Landfill = require ('../models/landfillModel'),
Dumpling = require ('../models/dumplingModel'),
landfillMock = require ('./landfillMock.json'),
dumplingMock = require ('./dumplingMock.json');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rancidShoeBomb', {useMongoClient: true});


// remove all object in the collections and insert mockdata

[[Landfill, landfillMock], [Dumpling, dumplingMock]].forEach(function(c) {
	c[0].remove({}, function(err) {
		console.log('collection removed');
	}).then(function(){
		c[0].insertMany(c[1]);
	});
});


//mongoose.connection.close();
