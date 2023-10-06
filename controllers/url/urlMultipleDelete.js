import connectToDatabase from "../../connectToDatabase.js";
import  URL from "../../models/URL.js";

const urlMultipleDelete = async (req, res) => {
    try {
        const { _id } = req.user;
        const { shortUrlIdsToDelete } = req.body;
        
        connectToDatabase();
        
        const deleteMultipleUrls = await URL.deleteMany({
            owner: _id,
            shortUrlId: { $in: shortUrlIdsToDelete }
        });

        res.status(200).json({
            message: 'Documents deleted successfully', deleteMultipleUrls
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

export default urlMultipleDelete