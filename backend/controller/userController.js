import { validationResult } from "express-validator";
import userModel from "../model/userModel.js";
import blacklistModel from "../model/blacklistModelToken.js"
import { createUser } from "../services/userService.js";
import { authUser } from "../middleware/AuthMiddleware.js";

//  register controller logic

export const registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }

        const { fullname, email, password } = req.body;


        const hashedPassword = await userModel.hashPassword(password)
        // after getting all details from user and hashing password we create a user 
        const user = await createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        });


        // to generate token after creating user 

        const token = user.generateAuthToken();

        res.status(201).json({ token, user });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


/// login controller logic

export const loginUser = async (req, res, next) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const { email, password } = req.body
        // check if user already exist

        const user = await userModel.findOne({ email }).select('+password')
        if (!user) {
            return res.status(401).json({ message: "invalid email or password" })
        }

        const isMatch = user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'invalid email or password' })
        }

        const token = user.generateAuthToken();

        res.cookie('token',token);

        return res.status(200).json({ token, user })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


// profile controller 

export const userProfile = async (req, res, next)=>{
    return res.status(200).json(req.user);
}

// logout constroller 

export const logoutUser = async(req, res, next)=>{
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    await blacklistModel.create({token});

    res.status(200).json({message : 'logged out'});
}