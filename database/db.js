const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB, 
      { useNewUrlParser: true, 
        useUnifiedTopology: true });
    console.log('DB connected');
  } catch (error) {
    console.error('DB Connection error', error.message);
    
  }
};

module.exports = connectDB;
