
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

