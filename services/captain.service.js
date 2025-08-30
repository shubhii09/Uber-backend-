const captainModel = require('../models/captain.model');


module.exports.createCaptain = async ({
    Firstname, Lastname, email, password,
    color, plate, capacity, vechileType
}) => {
    if (!Firstname || !email || !password || !color || !plate || !capacity || !vechileType) {
        throw new Error('All fields are required');
    }
    const captain =  captainModel.create({
        fullname: { 
            firstname: Firstname,
            lastname: Lastname
        },
        email,
        password,
        vechile: {
            color,
            plate,
            capacity,
            vechileType
        }
    })
    return captain;
}