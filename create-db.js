const express = require('express')
const app = express()
const port = 3000

var fs = require('fs');
const path = require('path');

var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Clickbait',
  database: 'marking_headlines'
})


connection.connect(function(err) {
  if (err) throw err
  console.log("Connected!")
})




  var sql = 'select * from headlines WHERE id IN (?, ?)';
  connection.query(sql, [1, 2] ,function (err, result) {
    if (err) throw err;
    console.log(result);
   });


// CREATE TABLES:
// connection.query('CREATE DATABASE marking_headlines');
// connection.query('CREATE TABLE headlines (id MEDIUMINT NOT NULL AUTO_INCREMENT, title VARCHAR(255), domen VARCHAR(255), PRIMARY KEY (id))', function (err, result) {
//     if (err) throw err;
//     console.log("Table created 1");
//   });
// connection.query('CREATE TABLE users (id MEDIUMINT NOT NULL AUTO_INCREMENT, title_id MEDIUMINT NOT NULL , ip VARCHAR(255), eval VARCHAR(255), PRIMARY KEY (id), FOREIGN KEY (title_id) REFERENCES headlines(id))', function (err, result) {
//     if (err) throw err;
//     console.log("Table created 2");
//   });


// var source_data_array = [];
// // FILES:
// filenames = fs.readdirSync('DATA');
//     //listing all files using forEach
//     filenames.forEach(function (file) {
//          data = fs.readFileSync(path.join('DATA', file));
//          var source_data = JSON.parse(data.toString('utf8'));
//          // https:// -> 8 chars
//          var domen_end_poz = source_data.link.indexOf('/', 8);
//          var domen = source_data.link.substring(8, domen_end_poz);
//          source_data_array.push([source_data.title, domen]);
//     });

// // LOAD JSON TO TABLE:
//   var sql = 'INSERT INTO headlines (title, domen) VALUES ?';
//   connection.query(sql, [source_data_array] ,function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + result.affectedRows);
//    });

  title_id = 1;
var array = [];
while (title_id != 5000) {
  array.push([title_id, 1]);
  title_id++;
}
console.log(array);
// FILL ALL User to TEST
  var sq = 'INSERT INTO users (title_id, number) VALUES ?';
  sql.query(sq, [array] ,function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
   });

connection.end();