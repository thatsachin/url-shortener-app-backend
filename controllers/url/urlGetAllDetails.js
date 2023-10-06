import connectToDatabase from "../../connectToDatabase.js";
import URL from "../../models/URL.js";

const urlGetAllDetails = async (req, res) => {
    try {
        const { _id } = req.user;

        connectToDatabase();

        const allDetails = await URL.find({owner: _id}).select('-__v -owner -_id');
        if(!allDetails) {
            return res.status(200).json({
                success: false,
                message: "Some Error Occured, Please try again!"
            })
        }

        return res.send(allDetails);
    }
    catch(error) {
        console.error(error);
        return res.status(200).json({
            success: false,
            message: "Some Error Occured, Please try again!"
        })
    }
}

export default urlGetAllDetails