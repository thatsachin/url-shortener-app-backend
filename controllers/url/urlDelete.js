import connectToDatabase from "../../connectToDatabase.js";
import URL from "../../models/URL.js";

const urlDelete = async (req, res) => {
    try {
        const { shortUrlId } = req.params;
        const { _id } = req.user;

        connectToDatabase();

        const deleteUrl = await URL.findOneAndDelete({owner: _id, shortUrlId});
        
        if(!deleteUrl) {
            return res.status(200).json({
                "success": false,
                "message": "No Short URL found to Delete!"
            })
        }

        return res.status(200).json({
            "success": true,
            "message": "Successfully Deleted the Short URL!"
        })
    }
    catch(error) {
        console.error(error);
        return res.status(200).json({
            success: false,
            message: "Some Error Occured, Please try again!"
        })
    }
}

export default urlDelete