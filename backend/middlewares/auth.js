const jwt = require('jsonwebtoken');
const AuthModel = require('../models/auth');

const auth = async (req, res, next) => {

  const { authorization } = req.headers

  if(!authorization){
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try{
    const {_id} = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await AuthModel.findOne({ _id }).select('_id')
    next()

  }catch(error){
    console.log(error)
    res.json(401).json({error: 'Request is not authorized'})
  }

};

module.exports = auth;
