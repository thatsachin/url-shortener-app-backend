import connectToDatabase from "../connectToDatabase.js";
import jwt from "jsonwebtoken";
import USER from "../models/USER.js";

const authenticator = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token) {
            return res.status(200).json({
                success: false,
                message: "Please login first!"
            })
        }
        const idFromToken = jwt.verify(token, process.env.JWT_SECRET);
        
        connectToDatabase();
        
        const user = await USER.findOne({_id: idFromToken.id});
        
        if(!user) {
            res.cookie('token', '', { maxAge: 0 });
            return res.status(200).json({
                success: false,
                message: "Please login first!"
            })
        }

        req.user = user;
        next();

    }
    catch(error) {
        console.error(error);
        return res.status(200).json({
            success: false,
            message: "Some Error Occured, Please try again!"
        })
    }
}

export default authenticator