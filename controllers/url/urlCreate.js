import connectToDatabase from "../../connectToDatabase.js";
import URL from "../../models/URL.js";
import generateShortUrlId from "../../utils/generateShortUrlid.js";

const urlCreate = async (req, res) => {
    try {
        const { _id } = req.user;
        const { destinationUrl } = req.body;

        connectToDatabase();

        let shortUrlId = generateShortUrlId(6);

        const checkId = await URL.findOne({shortUrlId});
        if(checkId) {
            shortUrlId = generateShortUrlId(6);
        }

        const newShortUrl = new URL({
            destinationUrl,
            owner: _id,
            shortUrlId
        })

        await newShortUrl.save();

        return res.status(200).json({
            success: true,
            message: "A new short url created successfully!",
            destinationlUrl: newShortUrl.destinationlUrl,
            shortUrl: `http://localhost:5000/${newShortUrl.shortUrlId}`,
            totaClicks: newShortUrl.totalClicks,
            creationDate: newShortUrl.creationDate
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

export default urlCreate