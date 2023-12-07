import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// you would have to import / invoke this in another file
export async function openDatabase () {
  return open({
    filename: './sql/project-database.db',
    driver: sqlite3.Database
  })
}

