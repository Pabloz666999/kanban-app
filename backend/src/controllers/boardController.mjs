import { Board, List, Card } from '../models/index.mjs'

export const getAllBoards = async (req, res) => {
  try {
    const boards = await Board.findAll({
      where: { ownerId: req.user.id },
      order: [['createdAt', 'DESC']]
    })
    
    res.json({
      success: true,
      data: boards
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const createBoard = async (req, res) => {
  try {
    const board = await Board.create({
      ...req.body,
      ownerId: req.user.id
    })
    
    res.status(201).json({
      success: true,
      data: board
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getBoardById = async (req, res) => {
  try {
    const board = await Board.findOne({
      where: { 
        id: req.params.id,
        ownerId: req.user.id 
      },
      include: [{
        model: List,
        as: 'lists',
        include: [{
          model: Card,
          as: 'cards',
          order: [['position', 'ASC']]
        }],
        order: [['position', 'ASC']]
      }]
    })
    
    if (!board) {
      return res.status(404).json({
        success: false,
        message: 'Board not found'
      })
    }
    
    res.json({
      success: true,
      data: board
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const updateBoard = async (req, res) => {
  try {
    const [updated] = await Board.update(req.body, {
      where: { 
        id: req.params.id,
        ownerId: req.user.id 
      }
    })
    
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Board not found'
      })
    }
    
    const board = await Board.findByPk(req.params.id)
    res.json({
      success: true,
      data: board
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const deleteBoard = async (req, res) => {
  try {
    const deleted = await Board.destroy({
      where: { 
        id: req.params.id,
        ownerId: req.user.id 
      }
    })
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Board not found'
      })
    }
    
    res.json({
      success: true,
      message: 'Board deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
