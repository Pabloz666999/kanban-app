import fs from 'fs'
import path from 'path'
import { sequelize } from '../models/index.mjs'

const runMigrations = async () => {
  try {
    const migrationFiles = [
      '001-create-users.sql',
      '002-create-boards.sql', 
      '003-create-lists.sql',
      '004-create-cards.sql'
    ]

    for (const file of migrationFiles) {
      const filePath = path.join(process.cwd(), 'src/migrations', file)
      const sql = fs.readFileSync(filePath, 'utf8')
      
      console.log(`Running migration: ${file}`)
      await sequelize.query(sql)
      console.log(`✅ ${file} completed`)
    }

    console.log('All migrations completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await sequelize.close()
  }
}

runMigrations()
