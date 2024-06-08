import request from 'supertest';
import app from '../src/app';
import { initializeDatabase, getDb } from '../src/database/database';
import { insertUsers } from '../src/services/userService';
import { CSVData } from '../src/types/CSVData';

beforeAll(async () => {
	await initializeDatabase();

	const users: CSVData[] = [
		{ name: 'John Doe', city: 'New York', country: 'USA', favorite_sport: 'Basketball' },
		{ name: 'Jane Smith', city: 'London', country: 'UK', favorite_sport: 'Football' },
	];

	await insertUsers(users);
});

afterAll(async () => {
	const db = getDb();
	await db.close();
});

describe('Get Users Endpoint', () => {
	it('should return all users when no query is provided', async () => {
		const response = await request(app).get('/api/users').send();

		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(2);
	});

	it('should return filtered users based on query', async () => {
		const response = await request(app).get('/api/users?q=John').send();

		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(1);
		expect(response.body.data[0].name).toBe('John Doe');
	});
});
