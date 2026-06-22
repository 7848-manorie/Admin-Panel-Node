const mongoose = require('mongoose');

const db = async () => {
    try {
        require('dotenv').config();

        mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log("Database Connected"))
            .catch(err => console.log(err));
        console.log("MongoDB Connected Successfully");
    }
    catch (err) {
        console.log("DB Error : ", err);
    }
}

module.exports = db;