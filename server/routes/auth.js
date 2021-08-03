import express from 'express'
import {
  signUp,
  signIn,
  getUser,
  updateUser,
  deleteUser,
  getOtherUser,
} from '../db/controllers/auth.js'
import { searchModels } from '../middleware/searchMiddleware.js'

const router = express.Router()

router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.get('/getUser', searchModels, getUser)
router.get('/getOtherUser/:userId', searchModels, getOtherUser)
router.patch('/updateUser', searchModels, updateUser)
router.delete('/deleteUser', searchModels, deleteUser)

export default router
