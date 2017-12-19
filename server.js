var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	Landfill = require ('./models/landfillModel'),
	Dump = require ('./models/dumpModel'),
	Dumpling = require ('./models/dumplingModel'),
	bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rancidShoeBomb', {useMongoClient: true});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/rancidShoeBombRoutes');
routes(app);

app.listen(port, () => console.log('throwing rancidShoeBombs on port ' + port))
