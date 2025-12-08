import express from 'express'
import authRoutes from './auth.mjs'
import boardRoutes from './boards.mjs'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/boards', boardRoutes)

export default router
