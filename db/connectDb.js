require('dotenv').config('../.env');
const mongoose = require("mongoose");


const connectDB = async () => {
    const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8wzqzge.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    // console.log(process.env.DB_USER)

    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database is connected")
    } catch (error) {
        console.log(error.message)
        
    }
}

module.exports = connectDB;