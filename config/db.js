const mongoose = require("mongoose");
const colors = require('colors');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB Connected.....'.green.inverse)
}

module.exports = connectDB