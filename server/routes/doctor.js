import express from 'express'
import {
  acceptSession,
  sessionFailed,
  sessionSucceed,
} from '../db/controllers/doctor.js'
import { isDoctor } from '../middleware/authMiddleware.js'

const router = express.Router()

router.patch('/acceptSession', isDoctor, acceptSession)
router.patch('/sessionFailed', isDoctor, sessionFailed)
router.patch('/sessionSucceed', isDoctor, sessionSucceed)

export default router
