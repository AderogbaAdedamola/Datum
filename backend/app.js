import express from "express";
import cors from "cors";
import useRouter from "./routes/user.route.js";
import surveyRouter from "./routes/survey.route.js";


const app = express();
app.set("trust proxy", 1);

app.use(cors());  //should set some allowed origins later

app.use(express.json());

//custom routes
app.use("/api/user", useRouter);
app.use("/api/survey", surveyRouter);

//Health check route
app.get("/", (req, res) => {
    res.send("Server is running");
});

export default app;