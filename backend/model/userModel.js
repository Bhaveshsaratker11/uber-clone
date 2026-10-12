import mongoose from "mongoose";
import  bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";



const userSchema = new mongoose.Schema({
   fullname : {

    firstname : {
        type : String,
        required : true,
        minlength : [3,"first name must be 3 characters"]
    },
    lastname : {
        type : String,
        required : true,
        minlength : [3,"first name must be 3 characters"]
    }

   } ,

   email : {
    type : String,
    required : true,
    unique : true
   },

   password : {
    type : String,
    required : true,
    select : false
   },


   // to track location of driver it need for that 

   socketId : {
    type : String,

   }
})



userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword =async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}



const userModel = mongoose.model('user',userSchema);

export default userModel;