const mongoose = require("mongoose");

const { MONGODB_URI } = process.env;

async function connectionDb() {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to: ${connection.name}`);
  } catch(err) {
    console.log(`Error: ${err.message}`);
  }   
}

module.exports = connectionDb;

