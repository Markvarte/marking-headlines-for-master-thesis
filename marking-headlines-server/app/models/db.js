const mysql = require("mysql");
const util = require('util');
const dbConfig = require("../config/db.config.js");

var pool  = mysql.createPool({
  connectionLimit : 10,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = pool;