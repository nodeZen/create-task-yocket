const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtGenerator = (email)=>{
    const payLoad={
        user:email
    }
    return jwt.sign(payLoad,process.env.jwtSecret,{expiresIn:60 * 60});
}

module.exports = jwtGenerator;