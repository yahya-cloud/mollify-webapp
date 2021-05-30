import express from 'express';
import {getDoctors, requestSession, submitRating} from '../db/controllers/patient.js';
import auth from '../db/middleware/auth.js';

const router = express.Router();

router.get('/getDoctors', auth, getDoctors);
router.patch('/requestSession', auth, requestSession);
router.patch('/submitRating', auth, submitRating);

export default router;