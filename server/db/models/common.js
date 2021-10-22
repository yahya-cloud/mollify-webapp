import mongoose from 'mongoose'

export const number = {
  type: Number,
  default: 0,
}

export const string = {
  type: String,
  required: true
}

export const commonFields = {
  photo: String,
  name: string,
  address: string,
  userType: string,
  email: string,
  phoneNumber: string,
}

export const scheduleFields = {
  photo: String,
  name: { type: String },
  address: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  time: { type: Date },
  sessionType: { type: String },
  disorder: { type: String },
  otherUserId: { type: String },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ConversationModel',
  },
}
