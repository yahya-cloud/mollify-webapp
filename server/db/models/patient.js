import mongoose from 'mongoose'
import { commonFields, scheduleFields } from './common.js'

//PATIENT SCHEMA
const patientSchema = mongoose.Schema({
  ...commonFields,
  password: { type: String, required: true },
  schedules: [
    {
      ...scheduleFields,
    },
  ],
})

const PatientModel = mongoose.model('Patient', patientSchema)
export default PatientModel
