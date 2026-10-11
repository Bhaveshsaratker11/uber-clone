import { validationResult } from "express-validator";
import userModel from "../model/userModel.js";
import { createUser } from "../services/userService.js";



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
            firstname : fullname.firstname,
            lastname : fullname.lastname,
            email,
            password : hashedPassword 
        });
  

        // to generate token after creating user 

        const token = user.generateAuthToken();

        res.status(201).json({ token, user });

    } catch (error) {
      return res.status(500).json({message : error.message})
    }
}