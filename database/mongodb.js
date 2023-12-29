const { MongoClient } = require('mongodb');

// Database connection URI (you should replace this with your actual MongoDB URI)
const uri = 'mongodb://localhost:27017/mydatabase';

let client;

const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
  }
  return client.db();
};

module.exports = connectToDatabase;
