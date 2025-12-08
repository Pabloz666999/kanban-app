import express from 'express'
import { auth } from '../middleware/auth.mjs'
import { validateRequired } from '../middleware/validate.mjs'
import {
  getAllBoards,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard
} from '../controllers/boardController.mjs'

const router = express.Router()

router.use(auth) // Semua routes board butuh authentication

router.get('/', getAllBoards)
router.post('/', validateRequired(['title']), createBoard)
router.get('/:id', getBoardById)
router.put('/:id', validateRequired(['title']), updateBoard)
router.delete('/:id', deleteBoard)

export default router
