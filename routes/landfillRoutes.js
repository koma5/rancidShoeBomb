'use strict';
module.exports = function(app) {

	var landfill = require('../controllers/landfillController');

	app.route('/').get(function (req, res){res.send({"shout": "rancidShoeBomb!!"})});

	app.route('/landfills')
		.get(landfill.list_all_landfills)
		.post(landfill.create_a_landfill);

	app.route('/landfills/:landfillId')
		.get(landfill.read_a_landfill)
		.put(landfill.update_a_landfill)
		.delete(landfill.delete_a_landfill);

};
