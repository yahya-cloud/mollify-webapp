import express from 'express'
import {
  signUp,
  signIn,
  getUser,
  updateUser,
  deleteUser,
} from '../db/controllers/auth.js'
import { searchModels } from '../db/middleware/searchMiddleware.js'

const router = express.Router()

router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.get('/getUser', searchModels, getUser)
router.patch('/updateUser', searchModels, updateUser)
router.delete('/deleteUser', searchModels, deleteUser)

export default router
