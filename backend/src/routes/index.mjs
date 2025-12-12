import express from "express"
import authRoutes from "./auth.mjs"
import boardRoutes from "./boards.mjs"

const router = express.Router()

router.use("/api/auth", authRoutes)
router.use("/api/boards", boardRoutes)

export default router
