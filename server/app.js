var createError = require("http-errors");
var express = require("express");
var path = require("path");

var app = express();
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
let todos = [{ content: "123", isCompleted: false }];

app.use(express.static(path.join(__dirname, "public")));
app.get("/test", (req, res) => {
  res.json({
    test1: "test1",
    test2: "test2",
    test3: "test3",
  });
});

app.get("/allTodos", (req, res) => {
  res.json(todos);
});

app.post("/addTodo", (req, res) => {
  console.log(req.body);
  if (req.body && req.body.content) {
    todos = [...todos, req.body];
    res.json({ addTodo: "succeeded" });
    return;
  }
  res.json({ addTodo: "failed" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/static/index.html"));
});

console.log(__dirname);
console.log(path.join(__dirname, "public"));

module.exports = app;
