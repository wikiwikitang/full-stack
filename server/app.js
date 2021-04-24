const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const connectToMongoose = require('./database/connect');
const Todo = require('./database/model');

//take care of GraphQL
//const { graphqlHTTP } = require('express-graphql');
const { graphqlHTTP } = require('express-graphql');
//const { buildSchema } = require('graphql');
const { schema, root } = require('./graphql');

connectToMongoose(mongoose);
var app = express();
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

//data store here
let todos = [{ content: '123', isCompleted: false }];

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.get('/test', (req, res) => {
  res.json({
    test1: 'test1',
    test2: 'test2',
    test3: 'test3',
  });
});

app.get('/allTodos', async (req, res) => {
  const todosRawDateFromDB = await Todo.find({}).exec();
  const todosFromDB = todosRawDateFromDB.map(
    ({ title, content, isCompleted, _id }) => {
      return {
        title,
        content,
        isCompleted,
        _id,
      };
    }
  );
  res.json(todosFromDB);
});

app.post('/addTodo', async (req, res) => {
  //console.log(req.body);
  if (req.body && req.body.title) {
    //todos = [...todos, req.body];
    const todo = new Todo({
      title: req.body.title,
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

app.post('/modTodo', async (req, res) => {
  //console.log(req.body);
  if (req.body && req.body.index !== undefined && req.body._id) {
    const queryResult = await Todo.findOne({ _id: req.body._id });
    console.log(queryResult);
    const originIsCompletedStatus = queryResult.isCompleted;
    queryResult.isCompleted = !queryResult.isCompleted;
    const saveResult = await queryResult.save();
    //todos[req.body.index].isCompleted = !todos[req.body.index].isCompleted;
    if (saveResult.isCompleted === !originIsCompletedStatus) {
      res.json({ modTodo: 'succeeded' });
      return;
    }
  }
  res.json({ modTodo: 'failed' });
});

app.post('/delTodo', async (req, res) => {
  if (req.body && req.body.index !== undefined && req.body._id) {
    //todos.splice(req.body.index, 1);

    const result = await Todo.deleteOne({ _id: req.body._id });
    if (result) {
      res.json({ delTodo: 'succeeded' });
      return;
    }
  }
  res.json({ delTodo: 'failed' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/static/index.html'));
});

console.log(__dirname);
console.log(path.join(__dirname, 'public'));

app.listen(
  process.env.PORT || '3002',
  console.log(`Server is starting at ${process.env.PORT || '3002'}`),
  console.log(
    `Running a GraphQL API server at http://localhost:${
      process.env.PORT || '3002'
    }/graphql`
  )
);

module.exports = app;
