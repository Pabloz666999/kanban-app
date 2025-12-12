import express from "express"
import { authenticateToken } from "../middleware/auth.mjs"
import {
  createBoardValidation,
  updateBoardValidation
} from "../validations/boardValidation.mjs"
import {
  getAllBoards,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard
} from "../controllers/boardController.mjs"

const router = express.Router()

router.use(authenticateToken) // Semua routes board butuh authentication

router.get("/", getAllBoards)
router.post("/", ...createBoardValidation, createBoard)
router.get("/:id", getBoardById)
router.put("/:id", ...updateBoardValidation, updateBoard)
router.delete("/:id", deleteBoard)

export default router
