const mongoose = require('mongoose');
const env = require('./env');

const connectDb = async () => {
  mongoose.set('strictQuery', true);

  await mongoose.connect(env.mongodbUri, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10
  });

  console.log('MongoDB connected');
};

module.exports = connectDb;
