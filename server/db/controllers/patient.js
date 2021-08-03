import PatientModel from '../models/patient.js'
import DoctorModel from '../models/doctor.js'
import { calculateRating } from './common.js'

// @desc  Get doctors
// @route GET/api/patient/getDoctors
// @access Private
export const getDoctors = async (req, res) => {
  try {
    const result = await DoctorModel.find()
    res.status(200).json({ result: result })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// @desc  Request Session
// @route GET/api/patient/requestSession
// @access Private
export const requestSession = async (req, res) => {
  try {
    const { time, sessionType, gender, disorder } = req.body.user
    const { name, address, email, phoneNumber, photo, _id } = req.user

    const doctor = await DoctorModel.findById(req.body.doctorId)

    const alreadyRequested = doctor.requests.find(
      (r) => r.userId.toString() === _id.toString()
    )

    if (alreadyRequested) {
      res.status(400)
      throw new Error('Session is Already Requested to this doctor')
    }

    const result = {
      name: name,
      gender: gender,
      time: time,
      sessionType: sessionType,
      disorder: disorder,
      email: email,
      address: address,
      phoneNumber: phoneNumber,
      photo: photo,
      userId: _id,
    }

    doctor.requests.push(result)
    const success = await doctor.save()
    if (success) {
      res.status(201).json({ message: 'Request have been successfully made' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

// @desc  Submit Rating
// @route GET/api/patient/submitRating
// @access Private
export const sessionCompleted = async (req, res) => {
  try {
    const { _id: patientId } = req.user
    const { userRating, doctorData } = req.body
    const { _id: scheduleId, email: doctorEmail } = doctorData

    const allRatings = await DoctorModel.findOne({ doctorEmail }, 'allRatings')

    const { updatedRatings, updatedRating } = calculateRating(
      allRatings,
      userRating
    )

    await DoctorModel.findOneAndUpdate(
      { email: req.body.email },
      { allRatings: updatedRatings, rating: updatedRating }
    )

    const result = await PatientModel.findByIdAndUpdate(
      { _id: patientId },
      {
        $pull: { schedules: { _id: scheduleId } },
      },
      { new: true }
    )

    res.status(201).json({ message: 'Response have been Recorded', result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Sorry server error.Please try again' })
  }
}
