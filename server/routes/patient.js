import express from 'express'
import {
  getDoctors,
  requestSession,
  submitRating,
} from '../db/controllers/patient.js'
import { isPatient } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/getDoctors', isPatient, getDoctors)
router.patch('/requestSession', isPatient, requestSession)
router.patch('/submitRating', isPatient, submitRating)

export default router
