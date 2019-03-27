var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	Landfill = require ('./models/landfillModel'),
	Dump = require ('./models/dumpModel'),
	Dumpling = require ('./models/dumplingModel'),
	bodyParser = require('body-parser');

var rancidLog = function(string) {
	console.log(new Date().toISOString() + string);
}

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rancidShoeBomb', {useMongoClient: true}).catch( err => {
	rancidLog(" first connection to database failed, exiting!");
	process.exit(1);
	
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization');
	rancidLog(" bomb on " + req.url);
	next();
});

app.set('json spaces', 1);

var routes = require('./routes/rancidShoeBombRoutes');
routes(app);

app.listen(port, () => rancidLog(' throwing rancidShoeBombs on port ' + port))

