'use strict';

var mongoose = require('mongoose'),
	Dumpling = mongoose.model('Dumpling');

exports.list_all_dumplings = function(req, res) {
	Dumpling.find({}, function(err, dumplings) {
		if (err) res.send(err);
		res.json(dumplings);
	});
};

exports.create_a_dumpling = function(req, res) {
	var new_dumpling = new Dumpling(req.body);
	new_dumpling.save(function(err, dumpling){
	if (err) res.send(err);
	res.json(dumpling);
	});
}


exports.read_a_dumpling = function(req, res) {
  Dumpling.findById(req.params.dumplingId, function(err, dumpling) {
    if (err)
      res.send(err);
    res.json(dumpling);
  });
};

exports.update_a_dumpling = function(req, res) {
	Dumpling.findOneAndUpdate({_id: req.params.dumplingId}, req.body, {new: true}, function (err, dumpling) {
	if (err) res.send(err);
	res.json(dumpling);
	});
};

exports.delete_a_dumpling = function(req, res) {

  Dumpling.remove({_id: req.params.dumplingId}, function(err, dumpling) {
    if (err)
      res.send(err);
    res.json({ message: 'Dumpling successfully deleted' });
  });
};
