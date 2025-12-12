import express from "express"
import { register, login } from "../controllers/authController.mjs"
import {
  registerValidation,
  loginValidation
} from "../validations/userValidation.mjs"
import { authenticateToken } from "../middleware/auth.mjs"

const router = express.Router()

router.post("/register", ...registerValidation, register)
router.post("/login", ...loginValidation, login)

export default router
