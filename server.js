const express = require('express', '4.16.2')
const app = express()

var router = express.Router();

message = {shout: 'rancidShoeBomb!!'};

app.use('/', router);

router.use(function(req, res, next) {
	console.log('bomb on ' + req.url);
	next();
});


router.get('/', (req, res) => res.send(message))
router.get('/landfills', (req, res) => res.send({resultset:[{name:'freshkills'}, {name:'Vorderthal common dump'}]}))

app.listen(3000, () => console.log('throwing rancidShoeBombs on port 3000'))
