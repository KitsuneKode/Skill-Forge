//[x]  Checked

const { dbURI } = require('./env');
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI + 'SKillForge');
    console.log('Connected to database');
  } catch (error) {
    console.error('Failed to connect to database.\n', error);
    process.exit(1);
  }
};

module.exports = connectDB;
