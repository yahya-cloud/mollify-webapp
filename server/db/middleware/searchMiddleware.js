import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import asyncHandler from 'express-async-handler'
import DoctorModel from '../models/doctor.js'
import PatientModel from '../models/patient.js'

dotenv.config()

const secret = process.env.SECRET

export const searchModels = asyncHandler(async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    let decodedData

    decodedData = jwt.verify(token, secret)

    req.user = await DoctorModel.findById(decodedData.id)
    if (!req.user) {
      req.user = await PatientModel.findById(decodedData.id)
    }

    next()
  } catch (error) {
    console.error(error)
    res.status(401)
    throw new Error('User not found')
  }
})
