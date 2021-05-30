import express from 'express';
import { signUp, signIn, getUser, updateUser, deleteUser } from '../db/controllers/auth.js';
import auth from '../db/middleware/auth.js';

const router = express.Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/getUser', auth, getUser);
router.patch('/updateUser', auth, updateUser);
router.delete('/deleteUser/:userType/:id', auth, deleteUser);

export default router;