const userLogout = async (req, res) => {
    try {
        const {token} = req.cookies;
        if(token) {
            res.cookie('token', '', { maxAge: 0 });
            return res.status(200).json({
                success: true,
                message: 'User Logged out Successfully!',
            })
        }

        return res.status(200).json({
            success: false,
            message: 'User is not logged in, Login First!',
        })
    }
    catch(error) {
        console.log(error);
    }
}

export default userLogout