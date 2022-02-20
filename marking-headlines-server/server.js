const express = require("express");
const cors = require("cors");
var bodyParser = require('body-parser');

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));


// app.use(require('connect').bodyParser());
// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// parse requests of content-type - application/json
// app.use(bodyParser.json());

// parse requests of content-type - application/json
 app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
 app.use(express.urlencoded({ extended: true }));



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome again." });
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
require("./app/routes/headline-user.routes.js")(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});