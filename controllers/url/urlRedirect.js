import connectToDatabase from "../../connectToDatabase.js";
import mongoose from "mongoose";
import URL from "../../models/URL.js";

const urlRedirect = async (req, res) => {
    try {
        const { id } = req.params;

        connectToDatabase();

        const findDestinationUrl = await URL.findOne({shortUrlId: id});

        if(!findDestinationUrl) {
            return res.status(200).json({
                success: false,
                message: "Link is invalid!"
            })
        }

        findDestinationUrl.totalClicks++;
        await findDestinationUrl.save();

        const destination = findDestinationUrl.destinationUrl;
        
        res.writeHead(301, { Location: `${destination}` });
        res.end();
    }
    catch(error) {
        console.log(error);
        return res.status(200).json({
            success: false,
            message: "Error Occured!, Please try again!"
        })
    }
}

export default urlRedirect