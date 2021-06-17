import PatientModel from '../models/patient.js'
import DoctorModel from '../models/doctor.js'
import mongoose from 'mongoose'

export const searchModels = async (email) => {
  try {
    let person
    person = await DoctorModel.findOne({ email })
    if (!person) {
      person = await PatientModel.findOne({ email })
    }
    return person
  } catch (error) {
    console.log(error)
  }
}

// @desc  Delete a person request
// @route POST/api/deleteRequest
// @access Private
export const deleteRequest = async (req, res) => {
  try {
    const { personEmail } = req.body
    const { _id: id, userType } = req.user
    let result

    userType === 'patient'
      ? (result = await PatientModel.findByIdAndUpdate(
          id,
          { $pull: { acceptedRequests: { email: personEmail } } },
          { new: true }
        ))
      : (result = await DoctorModel.findByIdAndUpdate(
          id,
          { $pull: { requests: { email: personEmail } } },
          { new: true }
        ))

    res.status(200).json({ result })
  } catch (error) {
    console.log(error)
  }
}
