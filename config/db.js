const mongoose = require("mongoose");
require("dotenv").config();

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected successfully");
    } catch (err) {
        console.error("DB Error:", err);
    }
};

module.exports = db;