import PatientModel from '../models/patient.js'
import DoctorModel from '../models/doctor.js'

// @desc  Accept a session
// @route POST/api/doctor/acceptSession
// @access Private
export const acceptSession = async (req, res) => {
  try {
    const { name, email, address, phoneNumber, photo, _id: id } = req.user
    const {
      time,
      sessionType,
      disorder,
      name: personName,
      photo: personPhoto,
      email: personEmail,
      _id: requestId,
    } = req.body.person

     await PatientModel.findOneAndUpdate(
      { email: personEmail },
      {
        $push: {
          acceptedRequests: {
            name: name,
            time: time,
            sessionType: sessionType,
            email: email,
            address: address,
            phoneNumber: phoneNumber,
            photo: photo,
          },
        },
      }
    )
 
    const result = await DoctorModel.findByIdAndUpdate(
      id,
      {
        $pull: { requests: { _id: requestId } },
        $push: {
          schedules: {
            name: personName,
            time: time,
            sessionType: sessionType,
            photo: personPhoto,
            disorder: disorder.toLowerCase(),
          },
        },
      },
      { new: true }
    )

    res.status(200).json({ result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error })
  }
}

// @desc  Session Failed
// @route POST/api/doctor/sessionFailed
// @access Private
export const sessionFailed = async (req, res) => {
  try {
    const id = req.user._id
    const patientId = req.body.personId
    const result = await DoctorModel.findByIdAndUpdate(
      id,
      {
        $pull: { schedules: { _id: patientId } },
        $inc: { 'sessions.failed': 1 },
      },
      { new: true }
    )

    res.status(200).json({ result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error })
  }
}

// @desc  Session Succeed
// @route POST/api/doctor/Succeed
// @access Private
export const sessionSucceed = async (req, res) => {
  try {
    const { price, _id } = req.user
    const { sessionType, disorder, _id: personId } = req.body.person

    const result = await DoctorModel.findOneAndUpdate(
      { _id: _id },
      {
        $inc: {
          earnings: price,
          'sessions.total': 1,
          [`sessions.${sessionType.toLowerCase()}`]: 1,
          [`disorders.${disorder.toLowerCase()}`]: 1,
        },
        $pull: { schedules: { _id: personId } },
      },
      { new: true }
    )
    res.status(200).json({ result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error })
  }
}
