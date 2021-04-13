import mongoose from 'mongoose';

const commonSchema = {
    photo: String,
    name: String,
    address: String,
    userType: String,
    email: String,
    phoneNumber: String,
    password: String
}
const number = {
    type: Number,
    default: 0
}

export const PatientModel = mongoose.model("Patient", {...commonSchema});

// DOCTOR SCHEMA
const arraySchema = mongoose.Schema({
    ...commonSchema,
    time: String,
    sessionType: String,
    disorder: String,
    gender: String
})


const doctorSchema = mongoose.Schema({
   ...commonSchema,
   pricing: String,
   earnings: number,
   ratings: number,
   sessions: {
       clinic: number,
       home: number,
       failed: number,
       total: number
   },
   schedule: [arraySchema],
   request: [arraySchema]
})

export const DoctorModel = mongoose.model("Doctor", doctorSchema);
