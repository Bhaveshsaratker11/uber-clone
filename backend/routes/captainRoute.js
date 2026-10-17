
import Router from "express";
import { body } from 'express-validator';
import { registerCaptain, captainLogin, captainProfile, captainLogout } from "../controller/captainController.js";
import { authCaptain } from "../middleware/AuthMiddleware.js";


const captainRoutes = Router();

captainRoutes.post("/register",[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min : 3}).withMessage('firstname must be contain 3 characters'),
    body('fullname.lastname').isLength({min : 3}).withMessage('must contain 3 characters'),
    body('password').isLength({min : 6}).withMessage('password must be ccontain 6 characters '),
    body('vehicle.color').isLength({min : 3}).withMessage("color must be contain 3 characters "),
    body('vehicle.plate').isLength({min : 3}).withMessage("plate must be contain 3 characters "),
    body('vehicle.capacity').isInt({min : 3}).withMessage("capacity should be at least 1"),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage("invalid type "),

], registerCaptain)


captainRoutes.get("/login",[
    body("email").isEmail().withMessage('Invalid email'),
    body("password").isLength({min : 6}).withMessage("password must be contain 6 characters")
], captainLogin);


captainRoutes.get("/profile",[
    body("email").isEmail().withMessage('Invalid email'),
    body("password").isLength({min : 6}).withMessage("password must be contain 6 characters")
], authCaptain, captainProfile);


captainRoutes.get("/logout", authCaptain, captainLogout)

export default captainRoutes ;

