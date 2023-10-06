import connectToDatabase from "../../connectToDatabase.js";
import bcrypt from "bcrypt";
import USER from "../../models/USER.js";
import jwt from "jsonwebtoken";

const userLogin = async (req, res) => {
    try {
        const {token} = req.cookies;

        if(token) {
            res.cookie('token', '', { maxAge: 0 });
        }

        const {email, password} = req.body;

        connectToDatabase();
        const user = await USER.findOne({email});

        if(!user) {
            return res.status(200).json({
                success: false,
                message: 'User not found, Please register before login.',
            })
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            return res.status(200).json({
                success: false,
                message: 'Password is incorrect!, Please try again.',
            })
        }

        const jwtToken = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET);

        const tokenExpiry = new Date(Date.now() + 7 * 24 * 3600000);

        res.cookie('token', jwtToken, {
            httpOnly: true,
            secure: true,
            expires: tokenExpiry,
            sameSite: "None"
        })

        return res.status(200).json({
            success: true,
            message: 'User Logged in Successfully!',
        })

    }
    catch(error) {
        console.log(error);
    }
}

export default userLogin