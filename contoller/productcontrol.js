// productController.js
const Product = require('../models/Productmodel');
const fs = require("fs")

const addProduct = async (req, res) => {
    let image_filename = `${req.file.filename}` ;
    const product = new Product({
        name: req.body.name,
        image: image_filename,
        category: req.body.category,
        price: req.body.price,
       
    });
    try {
        await product.save();
        res.json({
            success: true,
            message:"Food Added"
        });
    } catch (error) {
        console.error(error);
        res.json({ 
            success: false, 
            message: 'Failed to add product' });
    }
};

const removeProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.body.id);
        fs.unlink (`uploads/${product.image}`,()=>{})
        
        await Product.findByIdAndDelete(req.body.id)
        res.json({
            success: true,
            message:"Product Removed"
        });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'Failed to remove product' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        console.log("All products fetched");
        res.send({
            success: true,
            data: products
        });
    } catch (err) {
        console.error(err);
        res.json
        ({ success: false, 
            message: 'Failed to fetch products' 
        });
    }
};

module.exports = {
    addProduct,
    removeProduct,
    getAllProducts
};
