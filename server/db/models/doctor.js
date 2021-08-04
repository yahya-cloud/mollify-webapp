import mongoose from 'mongoose'
import { commonFields, number, scheduleFields } from './common.js'

const requestSchema = mongoose.Schema({
  photo: String,
  name: { type: String, required: true, default: undefined },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  sessionType: { type: String, required: true },
  disorder: { type: String, required: true },
  gender: { type: String, required: true },
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
  password: { type: String, required: true },
  price: { type: String, required: true },
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
      conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ConversationModel',
      },
    },
  ],
  requests: [requestSchema],
})

const DoctorModel = mongoose.model('Doctor', doctorSchema)
export default DoctorModel
