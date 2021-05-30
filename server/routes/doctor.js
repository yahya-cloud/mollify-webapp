import express from 'express';
import {acceptSession, sessionFailed, sessionSucceed} from '../db/controllers/doctor.js';
import auth from '../db/middleware/auth.js'

const router = express.Router();

router.patch('/acceptSession', auth, acceptSession);
router.patch('/sessionFailed', auth, sessionFailed);
router.patch('/sessionSucceed', auth, sessionSucceed);


export default router;