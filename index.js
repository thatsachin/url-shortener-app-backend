import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import moment from "moment-timezone";
import authRouter from "./routes/authRouter.js";
import urlRouter from "./routes/urlRouter.js";
import urlRedirect from "./controllers/url/urlRedirect.js";
import cors from "cors";

const app = express();

// here configuring the servers default time zone to indian timezone
moment.tz.setDefault("Asia/Kolkata");

app.use(cors({
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
    origin: "http://localhost:3000"
}))
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/url", urlRouter);

//this api route is to ignore request received on main domain of backend server
app.get("/", (req, res) => {
    res.status(400).json({
        success: false,
        message: "Invalid Link or Page not found!",
    });
})

app.get("/asd", (req, res) => {
    const date = moment().format('MMM D YYYY');
    res.status(200).json({
        success: true,
        message: "Welcome to Url Shortener App",
        date
    })
});

app.get("/:id", urlRedirect);

app.listen(process.env.PORT, () => {
    console.log(`Backend server is listening at PORT: ${process.env.PORT}\n`);
})