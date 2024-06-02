const express = require("express");
const cors = require("cors");


const dotenv = require("dotenv").config();
const connectDB = require('./database/db')
const Product = require('./models/Productmodel')

// importing Routes
const productRoutes = require('./routes/productroute');
const userRoutes = require('./routes/userroute');
const cartRoutes = require('./routes/cartroute');
const orderRoutes = require('./routes/orderroute')

// Configuring Port and express
const app = express();
const port = process.env.PORT || 3000; // Default to 3000 if PORT is not set

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
connectDB();

// Api endpoints 
app.use(productRoutes);
app.use(userRoutes);
app.use(cartRoutes);
app.use(orderRoutes)



// This is to upload the images to the upload folder using images as endpoint - so we configured
app.use('/images/',express.static('uploads'))



// Simple route for testing
app.get("/", (req, res) => {
    res.send("Express Started");
});

// Start the server
app.listen(port, (error) => {
    if (!error) {
        console.log(`Server connected on port ${port}`);
    } else {
        console.error(error);
    }
});






// creating endpoint for newcollections data
app.get('/newcollections',async(req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("newCollection Fetched")
    res.send(newcollection)
})



// creating api for popular in search 
app.get('/popularinsearch',async(req,res)=>{
    let products = await Product.find({category:"mini"});
    let popular = products.slice(0,4);
    console.log("Popular Fetched")
    res.send(popular)
})



// creating api for related Products 
app.get('/relatedproducts',async(req,res)=>{
    let products = await Product.find({category:"mini"});
    let popular = products.slice(8,11);
    console.log("Related Fetched")
    res.send(popular)
})













