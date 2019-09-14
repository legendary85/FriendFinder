//Dependencies
var express = require("express");
var expressParser = require("express-parser");
var path = require("path");

const app = express();

var PORT = process.env.PORT || 8080;

app.get("/", function(req, res) {
  res.send("Hello World");
});

app.listen(PORT, function() {
  console.log("App is listening on PORT: " + PORT);
});
