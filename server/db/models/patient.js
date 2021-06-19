import mongoose from 'mongoose'
import { commonFields } from './common.js'

//PATIENT SCHEMA
const patientSchema = mongoose.Schema({
  ...commonFields,
  password: { type: String, required: true },
  acceptedRequests: [
    {
      photo: String,
      name: { type: String, required: true },
      address: { type: String, required: true },
      email: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      time: { type: String, required: true },
      sessionType: { type: String, required: true },
    },
  ],
})

const PatientModel = mongoose.model('Patient', patientSchema)
export default PatientModel
