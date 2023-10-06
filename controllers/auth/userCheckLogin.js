import jwt from "jsonwebtoken";

const userCheckLogin = (req, res) => {
    try {
        const {token} = req.cookies;
        
        if(!token) {
            return res.status(200).json({
                success: false,
                message: "Please login first!"
            })
        }
        const idFromToken = jwt.verify(token, process.env.JWT_SECRET);

        if(idFromToken.id) {
            return res.status(200).json({
                success: true,
            });
        } else {
            return res.status(200).json({
                success: false,
            });
        }
    }
    catch(error) {
        console.log(error);
    }
}

export default userCheckLogin;