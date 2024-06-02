const Order=  require ("../models/Ordermodel.js")
const Users=  require ("../models/Usermodel.js")
const Stripe  = require ("stripe")


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// placing user order for frontend
const placeOrder = async(req,res) =>{
 
const frontend_url = "artvistafront.netlify.app";
try{
    const newOrder = new Order({
        userId:req.body.userId,
        items:req.body.items,
        amount:req.body.amount,
        address:req.body.address

    })
    // saving the data in the database and update it with the empty data
    await newOrder.save();
    await Users.findByIdAndUpdate(req.body.userId,{cartData:{}})



    const line_items = req.body.items.map((item)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:item.name
            },
            unit_amount:item.price*100*80
        },
        quantity:item.quantity

    }))
    line_items.push({
        price_data:{
            currency:"inr",
            product_data:{
                name:"Delivery Charges"
            },
            unit_amount:2*100*80
        },
        quantity:1

    })

    const session = await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:"payment",
        success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    })
    res.json({
        success:true,
        session_url:session.url
    })
}


catch(error){
    console.log(error);
    res.json({success:false,message:"error"})
}

}



// To verify the order payment 

const verifyOrder = async(req,res)=>
    {
    const{orderId,success} = req.body
    try{
        if(success==="true")
        {
        await Order.findByIdAndUpdate(orderId,{payment:true});
        res.json({
            success:true,
            message:"paid"
        })
        }
        else{
            await Order.findByIdAndDelete(orderId);
            res.json({
                success:false,
                message:"Not paid"
            })
        }
    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:"error on verifying payment"
        })
    }
}




// userOrders for frontend
const userOrders = async(req,res) => {
    try{
        const orders = await Order.find({ userId:req.body.userId});
        res.json({
            success:true,
            data:orders
        })
    }
    catch(error){
        console.log(error)
        res.json({
            success:false,
            message:"error on fetching user order "
        })
    }

}


// To find the all the orders of all the users in the Admin page 
const listOrders = async (req,res) =>{
    try{
        const orders = await Order.find({});
        res.json({
            success:true,
            message:"Orders fetched Success",
            data:orders
        })
    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:"Orders failed to fetch"
        })
    }
}

// Admin updating the food  order Status - api
const updateStatus =  async (req,res) =>{
try{
    await Order.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({
        success:true,
        message:"Status Updated"
    })
}catch(error){
    console.log(error)
    res.json({
        success:false,
        message:"Status update failed "

    })
}
}


module.exports = {
    placeOrder,
    verifyOrder,
    userOrders,
    listOrders,
    updateStatus
};
