import sequelize from "../config/database.mjs"
import UserModel from './User.mjs'
import BoardModel from './Board.mjs'
import ListModel from './List.mjs'
import CardModel from './Card.mjs'

// Initialize models
const User = UserModel(sequelize)
const Board = BoardModel(sequelize)
const List = ListModel(sequelize)
const Card = CardModel(sequelize)

// Setup associations
const models = { User, Board, List, Card }
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

export { sequelize, User, Board, List, Card }
