const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const USER_SCHEEMA = require("../models/user");
//
const jwt = require('jsonwebtoken');
jwtKey = "jwt";
//


let data = {};

data.signToken = function (user) {
  return new Promise((resolve, reject) => {
    jwt.sign({ _id: user._id }, jwtKey, (error, token) => {
      if (error) {
        return reject(error)
      }
      return resolve(token)
    })
  })
}

data.verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (!bearerHeader) {
    return res.status(401).json({ message: "TOKEN NOT PROVIDED", success: false });
  }

  try {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];

    const authdata = jwt.verify(token, jwtKey);
    const user = await USER_SCHEEMA.findOne({ _id: authdata._id });

    if (!user) {
      return res.status(400).json({ message: "You are not authorized", success: false });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Invalid Token", error: error.message });
  }

}


module.exports = data;