var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000;

var router = express.Router();

message = {shout: 'rancidShoeBomb!!'};

app.use('/', router);

router.use(function(req, res, next) {
	console.log('bomb on ' + req.url);
	next();
});


router.get('/', (req, res) => res.send(message))
router.get('/landfills', (req, res) => res.send({resultset:[{name:'freshkills'}, {name:'Vorderthal common dump'}]}))

app.listen(port, () => console.log('throwing rancidShoeBombs on port ' + port))
