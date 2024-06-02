const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true }, // Added `required: true` to ensure email is mandatory
    password: { type: String, required: true },
    cartData: { type: Object,default:{}},

},{minimize:false});

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;
