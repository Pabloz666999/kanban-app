import { DataTypes } from "sequelize"

export default (sequelize) => {
  const Board = sequelize.define("Board", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    backgroundColor: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '#0079bf'
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    timestamps: true
  })

  Board.associate = (models) => {
    Board.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' })
    Board.hasMany(models.List, { foreignKey: 'boardId', as: 'lists' })
  }

  return Board
}
