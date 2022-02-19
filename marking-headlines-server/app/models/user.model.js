const sql = require("./db.js");

const User = function(user) {
	this.title_id = user.title_id;
	this.number = user.number;
	this.eval = user.eval;
}

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });

};

User.findByNumber = (number, result) => {
  sql.query(`SELECT title_id FROM users WHERE number = ${number}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found users: ", res);
      //find ids
      result(null, res);
      return;
    }

    // not found user with specific number
    result({ kind: "not_found" }, null);
  });
};



module.exports = User;