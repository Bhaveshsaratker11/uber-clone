import { error } from "node:console";
import captainModel from "../model/captainModel.js";
import createCaptain from "../services/captainService.js";
import { validationResult } from "express-validator";
import { authCaptain } from "../middleware/AuthMiddleware.js";
import blacklistModel from "../model/blacklistModelToken.js"


export const registerCaptain = async (req, res, next)=>{

try {
    const errors = validationResult(req);

if(errors.isEmpty()){
    return res.status(401).json({errors : errors.array()})
}

const {fullname, email, password, vehicle} = req.body;

const captainAlreadyExist = await captainModel.findOne({email});

if(captainAlreadyExist){
    return res.status(401).json({
        message : "captain already exist",
    })
}

const hashedPassword = await captainModel.hashPassword(password);

const captain = await createCaptain({
    firstname : fullname.firstname,
    lastname: fullname.lastname,
    email,
    password : hashedPassword,
    vehicleType: vehicle.vehicleType,
    color :vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
})

const token = captain.generateAuthToken();

return res.status(201).json({captain, token});
} catch (error) {
    return res.status(500).json({message : error.message})
}

}


export const captainLogin = async(req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty){
        console.log(errors);
        return res.status(401).json({error : errors.array()});

    }

    const {email, password} = req.body;

    const captain = await captainModel.findOne({email}).select('+password');

    if(!captain){
        return res.status(401).json({message : "invalid email or password"});
    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message : 'invalid email or password'})
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);

    return res.status(201).json({token, captain})
}


export const captainProfile = async(req, res, next)=>{
    return res.status(201).json({captain : req.captain})
}


export const captainLogout = async(req, res, next)=>{
const token  = req.cookies.token || req.headers.authorization?.split(' ')[' 1 '];

await blacklistModel.create({token});

res.clearCookie('token');

res.status(200).json({message : "logout successfully"});
}