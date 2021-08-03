import express from 'express'
import {
  getDoctors,
  requestSession,
  sessionCompleted,
} from '../db/controllers/patient.js'
import { isPatient } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/getDoctors', isPatient, getDoctors)
router.patch('/requestSession', isPatient, requestSession)
router.patch('/sessionCompleted', isPatient, sessionCompleted)

export default router
