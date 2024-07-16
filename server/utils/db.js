const mongoose = require("mongoose");

URI = process.env.MONGODB_URI;
mongoose.connect(URI);

const connectDb = async () => {
    try{
        await mongoose.connect(URI);
        console.log("connection passed");
    } catch (error) {
        console.error("DB connection failed", error);
        process.exit(0);
    }
}

module.exports = connectDb;