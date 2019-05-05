'use strict';

var mongoose = require('mongoose'),
	Landfill = mongoose.model('Landfill');

const ObjectId = mongoose.Types.ObjectId

exports.list_all_landfills = function(req, res) {

    var per_page = (typeof req.query.per_page === 'undefined') ? 100 : parseInt(req.query.per_page)
    var page = (typeof req.query.page === 'undefined') ? 0 : parseInt(req.query.page)

    var aggregateStuff = [];

    if (typeof req.query.name !== 'undefined') {
        aggregateStuff.push(
            {"$match": {"$text": {"$search": req.query.name}}}
        );
    }

    aggregateStuff.push(
    {"$lookup": {"from": "dumplings", "localField": "_id", "foreignField": "landfill", "as": "dumplings"}},
    {"$skip": page * per_page},
    {"$limit": per_page},
    {"$project": {"dumplingCount": {"$size": "$dumplings"}, "name":1, "opened":1}}
    )

	Landfill.aggregate(aggregateStuff, function(err, landfill) {
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
  Landfill.aggregate([
    {"$match": {_id: ObjectId(req.params.landfillId) }},
    {"$lookup": {"from": "dumplings", "localField": "_id", "foreignField": "landfill", "as": "dumplings"}},
    {"$project": {"dumplingCount": {"$size": "$dumplings"}, "name":1, "opened":1, "dumplings":1}}
  ], function(err, landfill) {
    if (err)
      res.send(err);
    res.json(landfill[0]);
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
