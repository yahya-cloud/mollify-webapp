import PatientModel from '../models/patient.js'
import DoctorModel from '../models/doctor.js'
import ConversationModel from '../models/conversation.js'
import MessageModel from '../models/message.js'

// @desc  Accept a session
// @route POST/api/doctor/acceptSession
// @access Private
export const acceptSession = async (req, res) => {
  try {
    const {
      name: doctorName,
      email: doctorEmail,
      address: doctorAddress,
      phoneNumber: doctorNumber,
      photo: doctorPhoto,
      _id: doctorId,
    } = req.user

    const {
      time,
      sessionType,
      disorder,
      userId,
      phoneNumber: patientNumber,
      address: patientAddress,
      name: patientName,
      photo: patientPhoto,
      email: patientEmail,
      _id: requestId,
    } = req.body.person

    const newConversation = new ConversationModel({
      members: [doctorId.toString(), userId],
    })
    const savedConversation = await newConversation.save()

    await PatientModel.findByIdAndUpdate(userId, {
      $push: {
        schedules: {
          name: doctorName,
          time: time,
          sessionType: sessionType,
          email: doctorEmail,
          address: doctorAddress,
          phoneNumber: doctorNumber,
          photo: doctorPhoto,
          disorder: disorder.toLowerCase(),
          otherUserId: doctorId,
          conversationId: savedConversation._id,
        },
      },
    })

    const result = await DoctorModel.findByIdAndUpdate(
      doctorId,
      {
        $pull: { requests: { _id: requestId } },
        $push: {
          schedules: {
            name: patientName,
            time: time,
            number: patientNumber,
            address: patientAddress,
            email: patientEmail,
            sessionType: sessionType,
            photo: patientPhoto,
            disorder: disorder.toLowerCase(),
            conversationId: savedConversation._id,
            otherUserId: userId,
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
    const { _id: id, schedules } = req.user
    const sessionId = req.body.sessionId

    const { conversationId } = schedules.find((el) => el._id == sessionId)

    await ConversationModel.findByIdAndDelete(conversationId)
    await MessageModel.deleteMany({ conversationId: conversationId })

    const result = await DoctorModel.findByIdAndUpdate(
      id,
      {
        $pull: { schedules: { _id: sessionId } },
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
    const { price, _id, schedules } = req.user
    const { sessionType, disorder, _id: personId } = req.body.person

    const { conversationId } = schedules.find((el) => el._id == personId)

    await ConversationModel.findByIdAndDelete(conversationId)
    await MessageModel.deleteMany({ conversationId: conversationId })

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
