// productRoutes.js
const express = require('express');
const productController = require('../contoller/productcontrol');
const multer = require("multer");

const router = express.Router();


const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()} ${file.originalname}`)
    }
})
const upload = multer({storage:storage})


router.post('/addproduct',upload.single("image"), productController.addProduct);
router.post('/removeproduct', productController.removeProduct);
router.get('/allproducts', productController.getAllProducts);

module.exports = router;
