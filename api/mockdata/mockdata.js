var mongoose = require('mongoose'),
Landfill = require ('../models/landfillModel'),
Dump = require ('../models/dumpModel'),
Dumpling = require ('../models/dumplingModel'),
landfillMock = require ('./landfillMock.json'),
dumpMock = require ('./dumpMock.json', 'utf8'),
dumplingMock = require ('./dumplingMock.json');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rancidShoeBomb', {useMongoClient: true});


// remove all object in the collections

[Landfill, Dump, Dumpling].forEach(function(c) {
	c.remove({}, function(err) {
		console.log('collection removed')
	});
});


// insert mockdata from json files

Landfill.insertMany(landfillMock, function(err,result) {
   if (err) {
     console.log(err);
   }
});

Dump.insertMany(dumpMock, function(err,result) {
   if (err) {
     console.log(err);
   }
});

Dumpling.insertMany(dumplingMock, function(err,result) {
   if (err) {
     console.log(err);
   }
});

//mongoose.connection.close();
