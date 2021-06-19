import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import PatientModel from '../db/models/patient.js'
import DoctorModel from '../db/models/doctor.js'

dotenv.config()

const secret = process.env.SECRET

//middleware for patient requests
export const isPatient = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    let decodedData

    decodedData = jwt.verify(token, secret)

    req.user = await PatientModel.findById(decodedData.id)

    if (!req.user) {
      res.status(401)
      throw new Error()
    }
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'User Not Found' })
  }
}

//middleware for doctor requests
export const isDoctor = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    let decodedData

    decodedData = jwt.verify(token, secret)

    req.user = await DoctorModel.findById(decodedData.id)

    if (!req.user) {
      res.status(401)
      throw new Error()
    }
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'User Not Found' })
  }
}
