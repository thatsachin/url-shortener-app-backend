import express from "express";
import userLogin from "../controllers/auth/userLogin.js";
import userLogout from "../controllers/auth/userLogout.js";
import userRegister from "../controllers/auth/userRegister.js";
import userCheckLogin from "../controllers/auth/userCheckLogin.js";

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
    res.status(404).json({
        "success": false,
        "message": "Invalid Link or Page not found!"
    })
})

authRouter.post("/register", userRegister);

authRouter.post("/login", userLogin);

authRouter.get("/check-login", userCheckLogin);

authRouter.get("/logout", userLogout);

export default authRouter;