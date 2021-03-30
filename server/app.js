var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

//app.use("/", indexRouter);
//app.use("/users", usersRouter);
app.get("/test", (req, res) => {
  res.send({
    test1: "test1",
    test2: "test2",
    test3: "test3",
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/static/index.html"));
});

console.log(__dirname);
console.log(path.join(__dirname, "public"));

module.exports = app;
