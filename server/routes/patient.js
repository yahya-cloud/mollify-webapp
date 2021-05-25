import express from 'express';
import {getDoctors, requestSession} from '../controllers/patient.js';


const router = express.Router();

router.get('/getDoctors', getDoctors);
router.patch('/requestSession', requestSession);

export default router;