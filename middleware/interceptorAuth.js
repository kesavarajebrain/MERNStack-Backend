const jwt = require("jsonwebtoken");
const admin = require('../models/admin')
const interceptAuth = async(req, res, next) => {
  // verify auth headers
  
  const {authorization} = req.headers;
  console.log('%%%%%%%%%%%%',authorization)
  // if not the token in headers
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required!" });
  }
  // sample token be like its 2 parts like bearer and 3 parts of the token like below
  // 'Bearer dkjsnsjdriroe.fdjfdifuffdloo4rhhr.fdfdfdjdodfdfd'
  const token = authorization.split(' ')[1];
  console.log('&&&&&&&&',token)

  try {
    // here we verify the token is correct or not , with our local env secret key because we create the token associate with the secret
    const  _id  = jwt.verify(token, process.env.SECRET_KEY)
    console.log('------------',_id)
    req.user = await admin.findOne({ _id:_id });
    next()
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ error: "CONFIDENTIAL!!! Request is not authorized!" });
  }
};

module.exports = interceptAuth