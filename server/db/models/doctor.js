import mongoose from 'mongoose';
import {commonSchema, number, arraySchema, scheduleSchema} from './common.js';

// DOCTOR SCHEMA


const doctorSchema = mongoose.Schema({
   ...commonSchema,
   password: String,
   price: String,
   earnings: number,
   rating: number,
   allRatings: {
       star5: number,
       star4: number,
       star3: number,
       star2: number,
       star1: number,
   },
   sessions: {
       clinic: number,
       home: number,
       failed: number,
       total: number
   },
   disorders:{
       anxiety: number,
       stress: number,
       traumatic: number,
       depression: number,
       eating: number
   },
   schedules: [scheduleSchema],
   requests: [arraySchema]
})

const DoctorModel = mongoose.model("Doctor", doctorSchema);
export default DoctorModel;