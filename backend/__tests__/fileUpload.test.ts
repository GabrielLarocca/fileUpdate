import request from 'supertest';
import app from '../src/app';
import { initializeDatabase, getDb } from '../src/database/database';
import path from 'path';
import fs from 'fs';

beforeAll(async () => {
	await initializeDatabase();
});

afterAll(async () => {
	const db = getDb();
	await db.close();
});

describe('File Upload Endpoint', () => {
	it('should upload a CSV file, clear existing data, and insert new data into the database', async () => {
		const csvFilePath = path.join(__dirname, 'test.csv');

		const csvContent = 'name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball';
		fs.writeFileSync(csvFilePath, csvContent);

		let response = await request(app).post('/api/files').attach('file', csvFilePath);
		expect(response.status).toBe(200);
		expect(response.body.message).toBe('The file was uploaded successfully.');

		let users = await request(app).get('/api/users');
		expect(users.body.data.length).toBe(1);

		const newCsvContent = 'name,city,country,favorite_sport\nJane Smith,London,UK,Football';
		fs.writeFileSync(csvFilePath, newCsvContent);

		response = await request(app).post('/api/files').attach('file', csvFilePath);
		expect(response.status).toBe(200);
		expect(response.body.message).toBe('The file was uploaded successfully.');

		users = await request(app).get('/api/users');
		expect(users.body.data.length).toBe(1);
		expect(users.body.data[0].name).toBe('Jane Smith');

		fs.unlinkSync(csvFilePath);
	});

	it('should return an error if no file is uploaded', async () => {
		const response = await request(app).post('/api/files').send();

		expect(response.status).toBe(400);
		expect(response.body.message).toBe('No file uploaded');
	});
});
