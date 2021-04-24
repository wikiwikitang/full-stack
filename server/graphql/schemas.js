const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Todo {
    title: String
    content: String
    isCompleted: Boolean
    _id: String
  }

  input UpdateContent {
    title: String
    content: String
    isCompleted: Boolean
  }

  type Mutation {
    updateTodo(_id: String!, input: UpdateContent!): Todo
  }

  type Query {
    hello: String
    allTodos: [Todo]
  }
`);

module.exports = { schema };
