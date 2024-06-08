import { getDb } from '../database/database';
import { CSVData } from '../types/CSVData';

export const insertUsers = async (users: CSVData[]) => {
	const db = getDb();

	const insertPromises = users.map((user) => {
		const { name, city, country, favorite_sport } = user;

		return db.run(
			'INSERT INTO users (name, city, country, favorite_sport) VALUES (?, ?, ?, ?)',
			[name, city, country, favorite_sport]
		);
	});

	await Promise.all(insertPromises);
};

export const clearUsers = async () => {
	const db = getDb();
	await db.exec('DELETE FROM users');
};

export const searchUsers = async (query: string) => {
	const db = getDb();

	if (query) {
		return db.all(
			'SELECT * FROM users WHERE name LIKE ? OR city LIKE ? OR country LIKE ? OR favorite_sport LIKE ?',
			[`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`]
		);
	} else {
		return db.all('SELECT * FROM users');
	}
};
