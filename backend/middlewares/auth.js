const jwt = require('jsonwebtoken');
const AuthModel = require('../models/auth');

const auth = async (req, res, next) => {

  const { authorization } = req.headers

  if(!authorization){
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try{
    const {email} = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await AuthModel.findOne({ email }).select('email')
    next()

  }catch(error){
    console.log(error)
    res.json(401).json({error: 'Request is not authorized'})
  }

};

module.exports = auth;

// const jwt = require('jsonwebtoken');
// const AuthModel = require('../models/auth');

// const auth = async (req, res, next) => {

//   const { authorization } = req.headers

//   if(!authorization){
//     return res.status(401).json({error: 'Authorization token required'})
//   }

//   const token = authorization.split(' ')[1]

//   try{
//     const {email} = jwt.verify(token, process.env.JWT_SECRET)

//     req.user = await AuthModel.findOne({ email }).select('email')
//     next()

//   }catch(error){
//     console.log(error)
//     res.json(401).json({error: 'Request is not authorized'})
//   }

// };

// module.exports = auth;



// // const jwt = require('jsonwebtoken');

// // const auth = (req, res, next) => {
// //   const token = req.header('Authorization')?.split(' ')[1];
  
// //   if (!token) {
// //     return res.status(401).json({ message: 'Access Denied. No token provided.' });
// //   }

// //   try {
// //     const verified = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = verified;
// //     next();
// //   } catch (error) {
// //     res.status(400).json({ message: 'Invalid token.' });
// //   }
// // };

// // module.exports = auth;
