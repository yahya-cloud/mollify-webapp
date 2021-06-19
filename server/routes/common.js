import express from 'express'
import { deleteRequest } from '../db/controllers/common.js'
import { searchModels } from '../middleware/searchMiddleware.js'

const router = express.Router()

router.patch('/deleteRequest', searchModels, deleteRequest)

export default router
