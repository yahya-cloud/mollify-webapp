import conversationModel from '../models/conversation.js'

// @desc  Make new Conversation
// @route POST/api/conversation/
// @access Private
export const makeConversation = async (req, res) => {
  const newConversation = new conversationModel({
    members: [req.body.senderId, req.body.receiverId],
  })

  try {
    const savedConversation = await newConversation.save()
    res.status(200).json(savedConversation)
  } catch (error) {
    res.status(500).json(err)
  }
}

// @desc  find user Conversations
// @route get/api/conversation/:userId
// @access Private
export const getConversations = async (req, res) => {
  const { _id: id } = req.user
  
  try {
    const conversation = await conversationModel.find({
      members: { $in: [id.toString()] },
    })
    res.status(200).json(conversation)
  } catch (error) {
    res.status(500).json(err)
  }
}
