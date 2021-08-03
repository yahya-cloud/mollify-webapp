import express from 'express'
import {
  sendMessage,
  getConversationMessages,
} from '../db/controllers/message.js'
import { searchModels } from '../middleware/searchMiddleware.js'

const router = express.Router()

router.post('/', searchModels, sendMessage)
router.get('/:conversationId', searchModels, getConversationMessages)

export default router
