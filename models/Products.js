const mongoose = require('mongoose');
const multer = require('multer');

const path = require('path');

const imagePath = "uploads/productsImages";

const ProductsSchema = new mongoose.Schema({
    pname : {
        type : String,
        required : true
    },
     categoryID: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    },

    subcategoryID: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subcategory',
        required: true
    },
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: 'Admin',
        required: true
    },
    status : {
        type : String,
        default : 'Active'
    },
     productimg : {
        type : String,
        required : true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps : true
});

const productsStorage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, path.join(__dirname,"..",imagePath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+"-"+Date.now() + path.extname(file.originalname));
    }
});

ProductsSchema.statics.uploadproductsImages = multer({
    storage: productsStorage
}).single('productimg');

ProductsSchema.statics.adPath = imagePath;

const Products = mongoose.model('Products',ProductsSchema);

module.exports = Products;