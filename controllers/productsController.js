const path = require('path');

const fs = require('fs');

const bcrypt = require('bcrypt');

const nodemailer = require("nodemailer");

const passport = require('passport');
const Products = require('../models/Products');

const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');



module.exports.addproducts = async (req, res) => {
    try {
        const categories = await Category.find({});
        const subcategories = await Subcategory.find({});

        return res.render('add-products', {
            adminData: req.user,
            categories,
            subcategories
        });

    } catch (err) {
        console.log(err);
        return res.redirect('/');
    }
};


module.exports.insertproducts = async (req, res) => {
    try {
        let data = req.body;
         data.categoryID = req.body.categoryID;
        data.subcategoryID = req.body.subcategoryID;
        data.userID = req.user._id;

        if (req.file) {
            data.productimg = Products.adPath + "/" + req.file.filename;
        } else {
            req.flash('error', 'Product image is required');
            return res.redirect('back');
        }

        await Products.create(data);

        req.flash('success', 'Product added successfully');
        return res.redirect('/products/add-products');

    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};


module.exports.viewproducts = async (req, res) => {
    try {
        const productsData = await Products.find({ userID: req.user._id, isDeleted: false}).populate({ path: 'categoryID', select: 'cname' })
        .populate({ path: 'subcategoryID', select: 'sname' });

        return res.render('view-products', {
            productsData
        });

    } catch (err) {
        console.log(err);
        return res.render('view-products', { productsData: [] });
    }
};


module.exports.deleteproducts = async (req, res) => {
    try {
        await Products.findByIdAndUpdate(req.params.id, {
            isDeleted: true
        });

        req.flash('success', 'Product moved to trash');
        return res.redirect('/products/view-products');

    } catch (err) {
        console.log(err);
        req.flash('error', 'Error deleting product');
        return res.redirect('back');
    }
};

module.exports.trash = async (req, res) => {
    try {
        const productsData = await Products.find({
            userID: req.user._id,
            isDeleted: true
        })
        .populate('categoryID', 'cname')
        .populate('subcategoryID', 'sname');

        return res.render('trash-products', {
            productsData
        });

    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};

module.exports.restore = async (req, res) => {
    try {
        await Products.findByIdAndUpdate(req.params.id, {
            isDeleted: false
        });

        req.flash('success', 'Product restored successfully');
        return res.redirect('/products/trash-products');

    } catch (err) {
        console.log(err);
        req.flash('error', 'Error restoring product');
        return res.redirect('back');
    }
};


