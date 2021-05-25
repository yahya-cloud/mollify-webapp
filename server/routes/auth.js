import express from 'express';
import { signUp, signIn, getUser, updateUser } from '../controllers/auth.js';


const router = express.Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/getUser', getUser);
router.patch('/updateUser', updateUser);


export default router;