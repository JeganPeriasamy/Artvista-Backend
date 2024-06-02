const Users = require('../models/Usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require("validator");


const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT);
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ 
                success: false, 
                message: "User Doesn't exists" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid Password,Kindly enter correct one" });
        }
        
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.error("Error in login ",error);
        res.status(500).json({ success: false, message: "Error in login" });
    }
};


const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const exists = await Users.findOne({ email });
        if (exists) {
            return res.json({
                 success: false,
                 message : "User already exists with this email" });
        }

        // Validating email format and strong password 
        if (!validator.isEmail(email)){
            return res.json({
                 success:false,
                 message:"Please enter the valid Email"
             })
         }
        
        // Validating the password 
        if (password.length < 8){
            return res.json({
                success:false,
                message:"Please Enter the Strong password"
            })
        }

       
        // To encrypt the password  - Use:Encrypt - Hashing user password
        const hashedPassword = await bcrypt.hash(password, 10);
      
        const newUser = new Users({
            name: username,
            email: email,
            password: hashedPassword,
        
        });
        const user = await newUser.save();
        // To save the user in the database 

        // Generating token and passing to the user 
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errors: "Error on generating User" });
    }
};



module.exports = {
    signup,
    login
};