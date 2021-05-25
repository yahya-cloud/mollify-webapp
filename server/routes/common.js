import express from 'express';
import {deleteRequest} from '../controllers/common.js';

const router = express.Router();

router.patch('/deleteRequest', deleteRequest);

export default router;