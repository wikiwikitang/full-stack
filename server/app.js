var createError = require('http-errors');
var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
require('./database/connect');
const Todo = require('./database/model');

var app = express();
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

//data store here
let todos = [{ content: '123', isCompleted: false }];

app.use(express.static(path.join(__dirname, 'public')));
app.get('/test', (req, res) => {
  res.json({
    test1: 'test1',
    test2: 'test2',
    test3: 'test3',
  });
});

app.get('/allTodos', (req, res) => {
  res.json(todos);
});

app.post('/addTodo', async (req, res) => {
  console.log(req.body);
  if (req.body && req.body.content) {
    todos = [...todos, req.body];
    const todo = new Todo({
      content: req.body.content,
      isCompleted: req.body.isCompleted,
    });

    const newTodo = await todo.save();
    if (newTodo === todo) {
      res.json({ addTodo: 'succeeded' });
      return;
    }
    return res.json({ addTodo: 'failed' });
  }
  res.json({ addTodo: 'failed' });
});

app.post('/modTodo', (req, res) => {
  console.log(req.body);
  if (req.body && req.body.index !== undefined) {
    todos[req.body.index].isCompleted = !todos[req.body.index].isCompleted;
    res.json({ modTodo: 'succeeded' });
    return;
  }
  res.json({ modTodo: 'failed' });
});

app.post('/delTodo', (req, res) => {
  if (req.body && req.body.index !== undefined) {
    todos.splice(req.body.index, 1);
    res.json({ delTodo: 'succeeded' });
    return;
  }
  res.json({ delTodo: 'failed' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/static/index.html'));
});

console.log(__dirname);
console.log(path.join(__dirname, 'public'));

module.exports = app;
