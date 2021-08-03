import express from 'express'
import {
  makeConversation,
  getConversations,
} from '../db/controllers/conversation.js'
import { searchModels } from '../middleware/searchMiddleware.js'

const router = express.Router()

router.post('/', makeConversation)
router.get('/getConversations', searchModels, getConversations)

export default router
