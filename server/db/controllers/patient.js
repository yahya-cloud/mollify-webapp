import PatientModel from '../models/patient.js'
import DoctorModel from '../models/doctor.js'

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
    const { name, address, email, phoneNumber, photo } = req.user


    const result = await DoctorModel.findOneAndUpdate(
      { email: req.body.doctorEmail },
      {
        $push: {
          requests: {
            name: name,
            gender: gender,
            time: time,
            sessionType: sessionType,
            disorder: disorder,
            email: email,
            address: address,
            phoneNumber: phoneNumber,
            photo: photo,
          },
        },
      }
    )

    if (result) {
      res.status(201).json({ message: 'Request have been successfully made' })
    } else {
      throw new Error()
    }
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Sorry server error.Please request session again' })
  }
}

// @desc  Submit Rating
// @route GET/api/patient/submitRating
// @access Private
export const submitRating = async (req, res) => {
  try {
    const { userRating } = req.body

    const { allRatings } = await DoctorModel.findOne(
      { email: req.body.email },
      'allRatings'
    )

    //algorithm to calculate total rating
    if (userRating) {
      const updatedRatings = { ...allRatings }

      updatedRatings[userRating] = updatedRatings[userRating] + 1

      const { star1, star2, star3, star4, star5 } = updatedRatings

      const totalRating = star1 + star2 + star3 + star4 + star5

      const updatedRating = Math.ceil(
        (star1 * 1 + star2 * 2 + star3 * 3 + star4 * 4 + star5 * 5) /
          totalRating
      )

      const result = await DoctorModel.findOneAndUpdate(
        { email: req.body.email },
        { allRatings: updatedRatings, rating: updatedRating }
      )

      if (result) {
        res.status(201).json({ message: 'Response have been Recorded' })
      }
    }
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Sorry server error.Please request session again' })
  }
}
