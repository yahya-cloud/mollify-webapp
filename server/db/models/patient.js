import mongoose from 'mongoose';
import {commonSchema, arraySchema} from './common.js';


//PATIENT SCHEMA
const patientSchema = mongoose.Schema({
    ...commonSchema,
    password: String,
    sendRequests:[{id: String}],
    acceptedRequests:[arraySchema]
})

const PatientModel = mongoose.model("Patient", patientSchema);
export default PatientModel;