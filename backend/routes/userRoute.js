import express from 'express'
import { Router } from 'express'
import {body} from "express-validator";
import { registerUser } from '../controller/userController.js';


const router = Router();

router.post("/register",[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min : 3}).withMessage('firstname must be contain 3 character'),
    body('fullname.lastname').isLength({min : 3}).withMessage('lastname must be contain 3 character'),
    body('password').isLength({min : 6}).withMessage('password must be contain 6 characters')

], registerUser )

export default router ;