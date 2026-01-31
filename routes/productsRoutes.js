const express = require('express');

const route = express.Router();

console.log("products Routing..");

const passport = require('passport');

const productsCtl = require('../controllers/productsController');
const Products = require('../models/Products');

route.get('/add-products',passport.checkAuthentication, productsCtl.addproducts);

route.post('/insertproducts',passport.checkAuthentication, Products.uploadproductsImages,productsCtl.insertproducts);

route.get('/view-products',passport.checkAuthentication, productsCtl.viewproducts);

route.get('/delete-product/:id',passport.checkAuthentication,productsCtl.deleteproducts);

route.get('/trash-products',passport.checkAuthentication,productsCtl.trash);

route.get('/restore-product/:id',passport.checkAuthentication,productsCtl.restore);

module.exports = route;