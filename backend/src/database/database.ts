import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database<sqlite3.Database, sqlite3.Statement>;

export const initializeDatabase = async () => {
	db = await open({ filename: ':memory:', driver: sqlite3.Database });

	await db.exec(`
    CREATE TABLE users (
      name TEXT,
      city TEXT,
      country TEXT,
      favorite_sport TEXT
    )
  `);
};

export const getDb = () => db;
