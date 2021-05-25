import express from 'express';
import {acceptSession, sessionFailed, sessionSucceed} from '../controllers/doctor.js';

const router = express.Router();

router.patch('/acceptSession', acceptSession);
router.patch('/sessionFailed', sessionFailed);
router.patch('/sessionSucceed', sessionSucceed);


export default router;