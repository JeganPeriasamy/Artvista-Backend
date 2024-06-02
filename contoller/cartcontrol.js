// cartController.js

const Users = require('../models/Usermodel');

// add items to user cart
const addToCart = async (req,res) =>{
    try{
        // which we set in the middleware 
        let userData = await Users.findById(req.body.userId);
        let cartData = await userData.cartData;
        // if the item is not added to the cart 
        // added as the new 
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1 
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await Users.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({
            success:true,
            message:"Added to cart"
        })
    } 
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"error in adding cart "
        })
    }
}


// remove items from user cart
const removeFromCart = async (req,res) =>{

    try{
        let userData = await Users.findById(req.body.userId);
        let cartData = await userData.cartData;
    
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }
        await Users.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({
            success:true,
            message:"Removed to cart"
        })
    
    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"error in removing cart "
        })
    }
    }
    
    

// Fetch user cart data 
const getCart = async(req,res) =>{
    try{
        // which we set in the middleware 
        let userData = await Users.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({
            success:true,
            cartData,
            message:"Fetched Successfully from cart"
        })
    } 
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"error in Fetching from cart "
        })
    }
}


module.exports = {
    addToCart,
    removeFromCart,
    getCart
};
