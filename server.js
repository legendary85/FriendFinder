//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 8080;

//used to access static CSS and Images files
app.use(express.static(__dirname + "/app/css"));
app.use(express.static("./app/images"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

//require API and HTML routes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//listen function to show which port our connection is set to.
app.listen(PORT, function() {
  console.log("App is listening on PORT: " + PORT);
});
