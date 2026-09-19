import express from "express";
import { loginUser, registerUser, googleLogin, googleCallback } from "../controllers/user.controller.js";

const useRouter = express.Router();

useRouter.post("/login", loginUser);
useRouter.post("/register", registerUser);
useRouter.get("/google", googleLogin);
useRouter.get("/google/callback", googleCallback);

export default useRouter;