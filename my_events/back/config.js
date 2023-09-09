require('dotenv').config();

const mongoose = require('mongoose');

async function connectDb() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Db connecté !');
    }
    catch (err) {
        console.log('Mongo failed to connect!', err);
        process.exit(1);
    }
}

module.exports = {
    connectDb
}
  