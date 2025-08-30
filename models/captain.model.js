 const mongoose = require ('mongoose')
 const bcrypt = require('bcrypt')
 const jwt = require('jsonwebtoken')
// const { validate } = require('./user.model')
 const captainSchema =  new mongoose.Schema({
    fullname: {
        firstname: {
            type: String, 
            required: true, 
            minlength: [3 , 'firstname must be at least 3 characters long'],

        },
        lastname:{
            type : String,
            minlength:[3, 'lastname must be at least 3 characters long']
        },
    },   
        email:{
            type: String,
            required: true, 
            unique: true,
            lowercase: true,
            match: [ /^\S+@\S+\.\S+$/, 'please enter a valid email']
        },
        password:{
            type: String,
            required: true,
            select: false,
        },
        socket:{
            type:String,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'inactive'
        },
        vechile: {
            color:{
                type: String,
                required: true, 
                minlength: [3,  'color must be at least 3 characters long'],
            },
            plate:{
                type:String,
                required: true,
                minlength: [3, 'plate must be at least 3 characters long'],
            },
            capacity: {
                 type:Number ,
                required: true,
                min:[1, 'capacity must be at least 1'],
            },
            vechileType:{
                 type:String,
                required: true,
                enum: ['car', 'motorcycle', 'auto']
            }
        },

        location:{
            lat: {
                type:Number,
            },
            lng:{
                type:Number,
            }
        }
 })

 captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Set token to expire in 1 hour
    );
    return token;
 }

 captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
 }

    captainSchema.statics.hashPassword = async function (password) {   
    return await bcrypt.hash(password, 10);
    }

    const captainModel = mongoose.model('captain', captainSchema)


    module.exports = captainModel
    


    