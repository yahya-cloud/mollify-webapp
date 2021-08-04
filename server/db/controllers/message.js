import MessageModel from '../models/message.js'

// @desc  Send new Message
// @route POST/api/message/
// @access Private
export const sendMessage = async (req, res) => {
  const newMessage = new MessageModel(req.body)

  try {
    const savedMessage = await newMessage.save()
    res.status(200).json(savedMessage)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// @desc  Get all conversation Message
// @route POST/api/message/:conversationId
// @access Private
export const getConversationMessages = async (req, res) => {
  try {
    const messages = await MessageModel.find({
      conversationId: req.params.conversationId,
    })
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
