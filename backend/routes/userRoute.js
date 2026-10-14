import express from 'express'
import { Router } from 'express'
import {body} from "express-validator";
import { registerUser,loginUser,userProfile } from '../controller/userController.js';
import { authUser } from '../middleware/AuthMiddleware.js';

const router = Router();

router.post("/register",[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min : 3}).withMessage('firstname must be contain 3 character'),
    body('fullname.lastname').isLength({min : 3}).withMessage('lastname must be contain 3 character'),
    body('password').isLength({min : 6}).withMessage('password must be contain 6 characters')

], registerUser );


router.get("/login", [
    body('email').isEmail().withMessage("invalid email"),
    body('password').isLength({min : 6}).withMessage("incoorect password")
], loginUser)

router.get("/profile",authUser,userProfile)

export default router ;