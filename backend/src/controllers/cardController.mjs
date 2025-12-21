import { Card, List, Board } from "../models/index.mjs"
import { Op } from "sequelize"
import { successResponse, errorResponse, HTTP_STATUS } from "../utils/response.mjs"

const verifyListAccess = async (listId, userId, requireWrite = false) => {
  const list = await List.findByPk(listId, {
    include: [{ model: Board, as: "board" }]
  })

  if (!list) {
    return { error: "List not found", status: HTTP_STATUS.NOT_FOUND }
  }

  const isOwner = list.board.ownerId === userId
  const isPublic = !list.board.isPrivate

  if (requireWrite) {
    if (!isOwner) {
      return { error: "You don't have permission to modify this list", status: HTTP_STATUS.FORBIDDEN }
    }
  } else {
    if (!isOwner && !isPublic) {
      return { error: "You don't have permission to access this list", status: HTTP_STATUS.FORBIDDEN }
    }
  }

  return { list }
}

const getAllCards = async (req, res) => {
  try {
    const { listId } = req.query

    const verification = await verifyListAccess(listId, req.user.id, false)
    if (verification.error) {
      return errorResponse(res, verification.error, verification.status)
    }

    const cards = await Card.findAll({
      where: { listId },
      order: [["position", "ASC"]]
    })

    return successResponse(res, cards, "Cards retrieved successfully")
  } catch (error) {
    return errorResponse(res, error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }
}

const getCardById = async (req, res) => {
  try {
    const { id } = req.params

    const card = await Card.findByPk(id, {
      include: [
        {
          model: List,
          as: "list",
          include: [{ model: Board, as: "board" }]
        }
      ]
    })

    if (!card) {
      return errorResponse(res, "Card not found", HTTP_STATUS.NOT_FOUND)
    }

    const isOwner = card.list.board.ownerId === req.user.id
    const isPublic = !card.list.board.isPrivate

    if (!isOwner && !isPublic) {
      return errorResponse(res, "You don't have permission to access this card", HTTP_STATUS.FORBIDDEN)
    }

    return successResponse(res, card, "Card retrieved successfully")
  } catch (error) {
    return errorResponse(res, error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }
}

const createCard = async (req, res) => {
  try {
    const { listId, title, description, position, dueDate } = req.body

    const verification = await verifyListAccess(listId, req.user.id, true)
    if (verification.error) {
      return errorResponse(res, verification.error, verification.status)
    }

    let cardPosition = position
    if (cardPosition === undefined) {
      const maxPosition = await Card.max("position", { where: { listId } })
      cardPosition = (maxPosition || 0) + 1
    }

    const card = await Card.create({
      title,
      description,
      position: cardPosition,
      dueDate,
      listId,
      createdBy: req.user.id
    })

    await List.increment("cardCount", { where: { id: listId } })

    return successResponse(res, card, "Card created successfully", HTTP_STATUS.CREATED)
  } catch (error) {
    return errorResponse(res, error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }
}

const updateCard = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, dueDate } = req.body

    const card = await Card.findByPk(id, {
      include: [
        {
          model: List,
          as: "list",
          include: [{ model: Board, as: "board" }]
        }
      ]
    })

    if (!card) {
      return errorResponse(res, "Card not found", HTTP_STATUS.NOT_FOUND)
    }

    if (card.list.board.ownerId !== req.user.id) {
      return errorResponse(res, "You don't have permission to update this card", HTTP_STATUS.FORBIDDEN)
    }

    await card.update({ title, description, dueDate })

    return successResponse(res, card, "Card updated successfully")
  } catch (error) {
    return errorResponse(res, error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }
}

const deleteCard = async (req, res) => {
  try {
    const { id } = req.params

    const card = await Card.findByPk(id, {
      include: [
        {
          model: List,
          as: "list",
          include: [{ model: Board, as: "board" }]
        }
      ]
    })

    if (!card) {
      return errorResponse(res, "Card not found", HTTP_STATUS.NOT_FOUND)
    }

    if (card.list.board.ownerId !== req.user.id) {
      return errorResponse(res, "You don't have permission to delete this card", HTTP_STATUS.FORBIDDEN)
    }

    const listId = card.listId
    await card.destroy()

    await List.decrement("cardCount", { where: { id: listId } })

    return successResponse(res, null, "Card deleted successfully")
  } catch (error) {
    return errorResponse(res, error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }
}

const moveCard = async (req, res) => {
  try {
    const { id } = req.params
    const { listId: targetListId, position: targetPosition } = req.body

    await Card.sequelize.transaction(async (t) => {
      const card = await Card.findByPk(id, {
        include: [
          {
            model: List,
            as: "list",
            include: [{ model: Board, as: "board" }]
          }
        ],
        transaction: t
      })

      if (!card) {
        throw new Error("Card not found")
      }

      if (card.list.board.ownerId !== req.user.id) {
        throw new Error("Forbidden")
      }

      const targetVerification = await verifyListAccess(targetListId, req.user.id, true)
      if (targetVerification.error) {
        throw new Error(targetVerification.error)
      }
      
      const targetList = targetVerification.list

      if (card.list.board.id !== targetList.board.id) {
        throw new Error("Cannot move card to a list in a different board")
      }

      const sourceListId = card.listId
      const sourcePosition = card.position
      const isSameList = sourceListId === targetListId

      if (isSameList) {
        if (sourcePosition === targetPosition) {
          return
        }

        if (targetPosition > sourcePosition) {
          await Card.update(
            { position: Card.sequelize.literal("position - 1") },
            {
              where: {
                listId: sourceListId,
                position: { [Op.gt]: sourcePosition, [Op.lte]: targetPosition }
              },
              transaction: t
            }
          )
        } else {
          await Card.update(
            { position: Card.sequelize.literal("position + 1") },
            {
              where: {
                listId: sourceListId,
                position: { [Op.gte]: targetPosition, [Op.lt]: sourcePosition }
              },
              transaction: t
            }
          )
        }
      } else {
        await Card.update(
          { position: Card.sequelize.literal("position - 1") },
          {
            where: {
              listId: sourceListId,
              position: { [Op.gt]: sourcePosition }
            },
            transaction: t
          }
        )

        await Card.update(
          { position: Card.sequelize.literal("position + 1") },
          {
            where: {
              listId: targetListId,
              position: { [Op.gte]: targetPosition }
            },
            transaction: t
          }
        )

        await List.decrement("cardCount", { where: { id: sourceListId }, transaction: t })
        await List.increment("cardCount", { where: { id: targetListId }, transaction: t })
      }

      await card.update({ listId: targetListId, position: targetPosition }, { transaction: t })
    })

    const card = await Card.findByPk(id)
    return successResponse(res, card, "Card moved successfully")

  } catch (error) {
    if (error.message === "Card not found") {
        return errorResponse(res, "Card not found", HTTP_STATUS.NOT_FOUND)
    }
    if (error.message === "Forbidden" || error.message.includes("permission")) {
        return errorResponse(res, "You don't have permission to move this card", HTTP_STATUS.FORBIDDEN)
    }
    if (error.message === "List not found") { 
         return errorResponse(res, "Target list not found", HTTP_STATUS.NOT_FOUND)
    }
    if (error.message === "Cannot move card to a list in a different board") {
        return errorResponse(res, "Cannot move card to a list in a different board", HTTP_STATUS.BAD_REQUEST)
    }
    return errorResponse(res, error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }
}

const toggleComplete = async (req, res) => {
  try {
    const { id } = req.params

    const card = await Card.findByPk(id, {
      include: [
        {
          model: List,
          as: "list",
          include: [{ model: Board, as: "board" }]
        }
      ]
    })

    if (!card) {
      return errorResponse(res, "Card not found", HTTP_STATUS.NOT_FOUND)
    }

    if (card.list.board.ownerId !== req.user.id) {
      return errorResponse(res, "You don't have permission to update this card", HTTP_STATUS.FORBIDDEN)
    }

    await card.update({ isCompleted: !card.isCompleted })

    return successResponse(res, card, "Card status updated successfully")
  } catch (error) {
    return errorResponse(res, error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }
}

export {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
  moveCard,
  toggleComplete
}
