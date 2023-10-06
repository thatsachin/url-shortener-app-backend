import connectToDatabase from "../../connectToDatabase.js";
import URL from "../../models/URL.js";

const urlUpdate = async (req, res) => {
    try {
        const { _id } = req.user;
        const { newDestinationUrl, shortUrlId } = req.body;

        connectToDatabase();

        const shortUrlIdExists = await URL.findOne({owner: _id, shortUrlId});
        
        if(!shortUrlIdExists) {
            return res.status(200).json({
                success: false,
                message: "Error Occured, This Short URl doesn't exists!"
            })
        }

        const updateUrl = await URL.findOneAndUpdate(
            { owner: _id, shortUrlId: shortUrlId },
            { destinationUrl: newDestinationUrl }
        );

        if(!updateUrl) {
            return res.status(200).json({
                success: false,
                message: "No Short URL found to Update!"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Successfully Update the Short URL Destination!"
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

export default urlUpdate