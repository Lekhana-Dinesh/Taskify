/*import jwt from 'jsonwebtoken'
import User from "../models/user.model.js";
const isAuth = async (req , res , next)=>{
   const token =  req.cookies.token

   if(!token){
    return res.status(401).json({message:'Token not found'})
   }

   try {
    const decoded =  jwt.verify(token , process.env.JWT_SECRET)
    console.log(decoded)
    req.userId = user;
    next()

   } catch (error) {
      return res.status(401).json({message :'Token is not Valid'})
   }
}

export default isAuth*/
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    // decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user from DB (exclude password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // attach user object to request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default isAuth;
