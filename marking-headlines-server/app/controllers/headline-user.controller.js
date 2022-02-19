const Headline = require("../models/headline.model.js");
const User = require("../models/user.model.js");

// Create and Save a new user
exports.create = (req, res) => {
// Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const new_user = new User({
  	title_id: req.body.title_id,
  	number: req.body.number,
  	eval: req.body.eval
  });
    	User.create(new_user, (err, data) => {
    		    if (err)
                   res.status(500).send({
                   message:
                   err.message || "Some error occurred while creating the user."
                   });
                else res.send(data);
                });
};



// find user by number
exports.findByNumber = (req, res) => {
  if (!req.params) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const number = req.params.number;
  User.findByNumber(number, (err, title_ids) => {
      if (!title_ids) {
    Headline.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving headlines."
      });
    else res.send(data);
  });
  }
    else {

      var marked_titles_array = [];
      for (var i = 0; i < title_ids.length; i++) {
        marked_titles_array.push(title_ids[i].title_id);
      }
      Headline.getNotMarked(marked_titles_array, (err, data) => {
if (err)
      res.status(500).send({
        message:
          err.message || "No not marked headlines found."
      });
    else {
      res.send(data);
    }
      })
  }
  });

};