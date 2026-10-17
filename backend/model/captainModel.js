import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "firstname must contain 3 characters"]
        },
        lastname: {
            type: String,
            minlength: [3, "lastname must contain 3 characters"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,

    },
    password: {
        type: String,
        required: true,
        select: false
    },


    socketId: {
        type: String
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "must contain 3 characters"]
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "must contain 3 characters"]
        },
        capacity: {
            type: String,
            required: true,
            minlength: [1, "capacity should be at least 1"]
        },
         vehicleType: {
        type: String,
        required: true,
        enum: ['motorcycle', 'car', 'auto']
    },
    location : {
        lat : {
            type : Number,
        },
       lng : {
        type : Number
       } 

    }
    }
})

captainSchema.methods.generateAuthToken =function (){
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET, {expiresIn : '24h'});
    return token;
}

captainSchema.methods.comparePassword =async function(password){
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

const captainModel = mongoose.model('captain',captainSchema);

export default captainModel ;