const mongoose = require("mongoose");
require("dotenv").config();

const db = async () => {
    try {
        console.log("MONGO_URI:", process.env.MONGO_URI ? "FOUND" : "NOT FOUND");

        await mongoose.connect(process.env.MONGO_URI);

        console.log(" Database Connected successfully");
    } catch (err) {
        console.error(" DB Error:", err);
    }
};

module.exports = db;