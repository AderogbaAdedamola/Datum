import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
    getGoogleAuthURL,
    getGoogleTokens,
    getGoogleUser,
} from "../config/Googleoauth.js";


const googleLogin = (req, res) => {
    res.redirect(getGoogleAuthURL());
};


const googleCallback = async (req, res) => {
    try {
        const {code, error} = req.query;

        if (error) return res.redirect(`${process.env.CLIENT_URL}/login?error=google_denied`);
        if (!code) return res.status(400).json({ message: 'Missing authorization code'});

        const tokens = await getGoogleTokens(code);
        const googleUser = await getGoogleUser(tokens.access_token);

        if(!googleUser.email_verifiedd) {
            return res.status(403).json({ message: "Google email is not verified" });
        }

        let user = await User.findOne({ email: googleUser.email });

        if (!user){
            const [firstName, lastName] = googleUser.name.split(" "); 

            user = await User.create({
                email: googleUser.email,
                firstName: firstName,
                lastName: lastName,
                avatar: googleUser.picture,
                googleId: googleUser.sub,
                provider: 'google',
            });
        } else if (!user.googleId){
            user.googleId = googleUser.sub;
            user.provider = 'google';
            await user.save();
        }

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
        });

        res.redirect(process.env.CLIENT_URL);
    } catch (error) {
        console.error("Google Oauth error:", error.response?.data || error.message);
        res.redirect(`${process.env.CLIENT_URL}/login?error=google_failed`);
    }
}


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
            console.error("Login error", error.response?.data || error.message);
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

        const hashedPassword = bcrypt.hash(password);
        const user = await User.create({
            firstName,
            lastName,
            email,
            passsword: hashedPassword
        })

        const token = jwt.sign(
                {id: user._id},
                process.env.JWT_SECRET,
                {expiresIn: "3d"}
            );

        return res.status(201).json({
            user,
            message: "Account created successfully"
        })
    } catch (error) {
        console.error("Sign up error", error.response?.data || error.message);
        return res.status(500).json({
            message: "Failed to create account",
        })
    }
}

export {
    loginUser,
    registerUser,
    googleLogin,
    googleCallback
}