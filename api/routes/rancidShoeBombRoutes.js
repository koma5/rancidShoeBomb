'use strict';
module.exports = function(app) {

	var landfill = require('../controllers/landfillController'),
	dumpling = require('../controllers/dumplingController');

	app.route('/').get(function (req, res) {
		res.send({"shout": "rancidShoeBomb!!"})
	});

	//landfills
	app.route('/landfills')
		.get(landfill.list_all_landfills)
		.post(landfill.create_a_landfill);

	app.route('/landfills/:landfillId')
		.get(landfill.read_a_landfill)
		.put(landfill.update_a_landfill)
		.delete(landfill.delete_a_landfill);

	//dumplings
	app.route('/dumplings')
		.get(dumpling.list_all_dumplings)
		.post(dumpling.create_a_dumpling);

	app.route('/dumplings/:dumplingId')
		.get(dumpling.read_a_dumpling)
		.put(dumpling.update_a_dumpling)
		.delete(dumpling.delete_a_dumpling);
};
