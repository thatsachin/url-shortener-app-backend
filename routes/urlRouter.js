import express from "express";
import urlCreate from "../controllers/url/urlCreate.js";
import urlDelete from "../controllers/url/urlDelete.js";
import urlGetAllDetails from "../controllers/url/urlGetAllDetails.js";
import urlUpdate from "../controllers/url/urlUpdate.js";
import authenticator from "../middlewares/authenticator.js";
import urlMultipleDelete from "../controllers/url/urlMultipleDelete.js";

const urlRouter = express.Router();

urlRouter.get("/", (req, res) => {
    res.status(404).json({
        "success": false,
        "message": "Invalid Link or Page not found!"
    })
})

// this route /api/v1/url/create when the user wants to create a new short url
urlRouter.post("/create", authenticator, urlCreate);

// this route /api/v1/url/info when the web app shows all the short urls created by the user
urlRouter.get("/info", authenticator, urlGetAllDetails);

// this route /api/v1/url/update when the user wants to update the short url destination
urlRouter.put("/update", authenticator, urlUpdate);

// this route /api/v1/url/delete/:shortUrlId when the user wants to delete a short url from its repository
urlRouter.delete("/delete/:shortUrlId", authenticator, urlDelete);

// this route /api/v1/url/multipledelete when the user wants to delete more than one or all short url from its repository
urlRouter.delete("/multipledelete", authenticator, urlMultipleDelete);

export default urlRouter;