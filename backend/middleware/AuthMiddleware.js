import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import captainModel from "../model/captainModel.js";


export const authUser = async (req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    if(!token){
        return res.status(401).json({message : "unauthorized"});

    }

    const isBlacklisted = await userModel.findOne({token : token});
    if(isBlacklisted){
        return res.status(401).json({message : "Unatuhorized"});
    }

    try {
         
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decode._id);
        req.user  = user;

        return next();
    } catch (error) {
        return res.status(401).json({message : "Unathorized"})
    }
}


export const authCaptain = async(req, res, next)=>{
     const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    if(!token){
        return res.status(401).json({message : "unauthorized"});

    }

    const isBlacklisted = await captainModel.findOne({'token' : token});
    if(isBlacklisted){
        return res.status(401).json({message : "Unatuhorized"});
    }

    try {
         
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decode._id);
        req.captain  = captain;

        return next();
    } catch (error) {
        return res.status(401).json({message : error.message})
    }
}


