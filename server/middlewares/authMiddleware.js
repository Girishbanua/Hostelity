const jwt = require("jsonwebtoken");
const {StudentModel} = require("../models/Student");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res
            .status(401)
            .json({ message: "No token, authorization denied" });
    }
    
    const jwtToken = token.replace("Bearer ", "").trim()
    
    console.log("token: ", jwtToken);

    try{
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SEC_KEY);
        console.log("isVerified: ", isVerified);

        const userData = await StudentModel.findOne({ email: isVerified.email });        

        req.user = userData
        req.token = jwtToken
        req.userID = userData._id
        next();
    } catch(err) {
        return res
            .status(401)
            .json({ message: "Token verification failed, authorization denied" });
    }   
}

module.exports = authMiddleware