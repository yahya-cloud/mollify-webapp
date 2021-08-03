import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
)

const conversationModel = mongoose.model('Conversation', conversationSchema)

export default conversationModel