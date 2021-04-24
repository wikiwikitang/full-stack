const Todo = require('../database/model');

const root = {
  hello: () => {
    return 'Hello world!';
  },
  allTodos: async () => {
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
    return todosFromDB;
  },
  updateTodo: async ({ _id, input }) => {
    //const queryResult = await Todo.findOne({ _id: req.body._id });
    //queryResult.updateOne()
    //console.log(_id, input);
    const updateResult = await Todo.findOneAndUpdate({ _id }, input, {
      new: true,
    });

    return {
      _id: updateResult._id,
      isCompleted: updateResult.isCompleted,
      title: updateResult.title,
      content: updateResult.content,
    };
  },
};

module.exports = { root };
