import mongoose from 'mongoose';


export const commonSchema = {
    photo: String,
    name: String,
    address: String,
    userType: String,
    email: String,
    phoneNumber: String
}
export const number = {
    type: Number,
    default: 0
}
export const arraySchema = mongoose.Schema({
    ...commonSchema,
    time: String,
    sessionType: String,
    disorder: String,
    gender: String
})

export const scheduleSchema =  mongoose.Schema({
    name: String,
    photo: String,
    time: String,
    sessionType: String,
    disorder: String
})
