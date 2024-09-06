const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://edvard230807:1u7YpzJg9zjw9Syq@cluster0.wn1aa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = client;
