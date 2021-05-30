import express from 'express';
import {deleteRequest} from '../db/controllers/common.js';
import auth from '../db/middleware/auth.js'

const router = express.Router();

router.patch('/deleteRequest', auth, deleteRequest);

export default router;