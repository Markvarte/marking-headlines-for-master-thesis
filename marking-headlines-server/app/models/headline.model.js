const sql = require("./db.js");

const Headline = function(headline) {
	this.title = headline.title;
	this.domen = headline.domen;
}

Headline.getAll = (result) => {
  sql.query("SELECT * FROM headlines", (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
});
};

Headline.getNotMarked = (title_ids, result) => {
  sql.query(`SELECT * FROM headlines WHERE id NOT IN (${title_ids.join(', ')})`, (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
});
};

// Headline.getIdFromTitle = (title, result) => {
//   sql.query(`SELECT * FROM headlines WHERE title = ${title}`, titles, (err, res) => {
//       if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("Headline: ", res);
//     result(null, res);
// });
// };

module.exports = Headline;