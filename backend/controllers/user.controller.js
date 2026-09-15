import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const loginUser = async (req, res) => {
    try {
            const {email, password} = req.body;

            if  (!email || !password){
                return res.status(400).json({
                    message: "Email and Password required."
                })
            };

            const user = await User.findOne({email});
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                })
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid){
                return res.status(400).json({
                    message: "Password is incorrect.",
                })
            }
            //After valid email and password.. sign jwt
            const token = jwt.sign(
                {id: user._id},
                process.env.JWT_SECRET,
                {expiresIn: "3d"}
            );

            return res.status(200).json({
                message: "Logged in successfully!",
                user,
                token
            })
    } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Login failed"
            })
    }
}

const registerUser = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;

        if (!firstName || !lastName || !email || !password){
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const existingUser = await User.findOne({ email });

        if (existingUser){
            return res.status(400).json({
                message: "User already exists"             //continue from here
            })
        }

        const user = await User.create
    } catch (error) {
        
    }
}