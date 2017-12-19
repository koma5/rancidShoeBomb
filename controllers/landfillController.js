'use strict';

var mongoose = require('mongoose'),
	Landfill = mongoose.model('Landfill');

exports.list_all_landfills = function(req, res) {
	Landfill.find({}, function(err, landfill) {
		if (err) res.send(err);
		res.json(landfill);
	});
};

exports.create_a_landfill = function(req, res) {
	var new_landfill = new Landfill(req.body);
	new_landfill.save(function(err, landfill){
	if (err) res.send(err);
	res.json(landfill);
	});
}


exports.read_a_landfill = function(req, res) {
  Landfill.findById(req.params.landfillId, function(err, landfill) {
    if (err)
      res.send(err);
    res.json(landfill);
  });
};

exports.update_a_landfill = function(req, res) {
	Landfill.findOneAndUpdate({_id: req.params.landfillId}, req.body, {new: true}, function (err, landfill) {
	if (err) res.send(err);
	res.json(landfill);
	});
};

exports.delete_a_landfill = function(req, res) {

  Landfill.remove({_id: req.params.landfillId}, function(err, landfill) {
    if (err)
      res.send(err);
    res.json({ message: 'Landfill successfully deleted' });
  });
};