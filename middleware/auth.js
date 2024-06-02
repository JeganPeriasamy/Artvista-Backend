const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const {token} = req.headers;
  if (!token) {
    return res.json({
      success:false,
      message:"Not Authorized , Login Again" 
  })
  }
   // To decode the getting token 
  try {
    const token_decode = jwt.verify(token, process.env.JWT); // Ensure you use the correct environment variable for the secret
     // getting the Id in the token and setting it to the body of userId
     req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
                res.json({
                    success:false,
                    message:'error'
                })
  }
};

module.exports = authMiddleware;
