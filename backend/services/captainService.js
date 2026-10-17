import captainModel from "../model/captainModel.js";


const createCaptain = async ({firstname, lastname, email, password, capacity, vehicleType, plate, color}) =>  {
    if(!firstname || !email || !password || !vehicleType || !color || !capacity || !plate ){
        throw new Error('All fields are required');
    }

    const captain = captainModel.create({
      fullname : {
        firstname,
        lastname
      },
      email,
      password,
      vehicle :{
        color,
        plate,
        capacity,
        vehicleType
      }
    })

    return captain ;
}

export default createCaptain ;