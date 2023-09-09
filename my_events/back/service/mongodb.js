require('dotenv').config();

const mongoose = require('mongoose');


connectDb().catch(err => console.log(err));

async function connectDb() {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Db connecté !');
}

module.exports = {
    connectDb
}