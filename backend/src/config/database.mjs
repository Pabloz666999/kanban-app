import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: 3307, //ini sy tambahin karena port xampp sy 3307
    dialect: "mysql",
    logging: false
  }
)

export default sequelize
