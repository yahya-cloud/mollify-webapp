import mongoose from 'mongoose'
import { commonFields, number, string, scheduleFields } from './common.js'

const requestSchema = mongoose.Schema({
  photo: String,
  name: { type: String, required: true},
  address: string,
  email: string,
  phoneNumber: string,
  sessionType: string,
  disorder: string,
  gender: string,
  time: { type: Date, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'PatientModel',
  },
})

// DOCTOR SCHEMA
const doctorSchema = mongoose.Schema({
  ...commonFields,
  password: string,
  price: string,
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
    virtual: number,
    failed: number,
    total: number,
  },
  disorders: {
    anxiety: number,
    stress: number,
    traumatic: number,
    depression: number,
    eating: number,
  },
  schedules: [
    {
      ...scheduleFields,
    },
  ],
  requests: [requestSchema],
})

const DoctorModel = mongoose.model('Doctor', doctorSchema)
export default DoctorModel
