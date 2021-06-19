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
    const { id: instanceId } = req.body
    const { _id: id, userType } = req.user
    let result
    console.log(instanceId)

    userType === 'patient'
      ? (result = await PatientModel.findByIdAndUpdate(
          id,
          { $pull: { acceptedRequests: { _id: instanceId } } },
          { new: true }
        ))
      : (result = await DoctorModel.findByIdAndUpdate(
          id,
          { $pull: { requests: { _id: instanceId } } },
          { new: true }
        ))

    res.status(200).json({ result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
