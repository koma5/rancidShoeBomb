'use strict';

var mongoose = require('mongoose'),
	Dump = mongoose.model('Dump');

exports.list_all_dumps = function(req, res) {
	Dump.find({}, function(err, dump) {
		if (err) res.send(err);
		res.json(dump);
	});
};

exports.create_a_dump = function(req, res) {
	var new_dump = new Dump(req.body);
	new_dump.save(function(err, dump){
	if (err) res.send(err);
	res.json(dump);
	});
}


exports.read_a_dump = function(req, res) {
  Dump.findById(req.params.dumpId, function(err, dump) {
    if (err)
      res.send(err);
    res.json(dump);
  });
};

exports.update_a_dump = function(req, res) {
	Dump.findOneAndUpdate({_id: req.params.dumpId}, req.body, {new: true}, function (err, dump) {
	if (err) res.send(err);
	res.json(dump);
	});
};

exports.delete_a_dump = function(req, res) {

  Dump.remove({_id: req.params.dumpId}, function(err, dump) {
    if (err)
      res.send(err);
    res.json({ message: 'Dump successfully deleted' });
  });
};
