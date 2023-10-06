import connectToDatabase from "../../connectToDatabase.js";
import USER from "../../models/USER.js";
import bcrypt from "bcrypt";

const userRegister = async (req, res) => {
    try {
        const {fullName, email, password} = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 9);
        
        connectToDatabase();
        
        const user = new USER({
            fullName, 
            email, 
            password: hashedPassword
        })

        await user.save();
        
        if(!user) {
            return res.status(200).json({
                success: false,
                message: 'User Registeration Failed!, Please try again',
            })
        }

        return res.status(200).json({ 
            success: true,
            message: 'User Registered Successfully.',
            userDetails: user
        });
    }
    catch(error) {
        console.log(error);
        const errorMessage = (error.message).includes("duplicate") ? "Email-ID already in use, use another Email-ID!" : "Error Occured!";
        return res.status(200).json({
            success: false,
            message: errorMessage
        })
    }
}

export default userRegister