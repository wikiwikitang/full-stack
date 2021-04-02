const mongoose = require('mongoose');

/*

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://chen-tang:<password>@cluster0.8ywno.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

Replace <password> with the password for the chen-tang user. Replace myFirstDatabase with the name of the database that connections will use by default. Ensure any option params are URL encoded.

*/

/*
mongodb+srv://chen-tang:Applewmt1@cluster0.8ywno.mongodb.net/test

You will be prompted for the password for the chen-tang user's (Database User) username.
When entering your password, make sure that any special characters are URL encoded.
*/

mongoose.connect(
  'mongodb+srv://chen-tang:Applewmt1@cluster0.8ywno.mongodb.net/todosDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("we're connected!");
});
