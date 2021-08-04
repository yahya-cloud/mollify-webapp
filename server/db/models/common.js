import mongoose from 'mongoose'

export const commonFields = {
  photo: String,
  name: { type: String, required: true },
  address: { type: String, required: true },
  userType: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
}
export const number = {
  type: Number,
  default: 0,
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
}
