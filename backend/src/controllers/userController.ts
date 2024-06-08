import { Request, Response } from 'express';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import { Writable } from 'stream';
import { insertUsers, clearUsers, searchUsers } from '../services/userService';
import { CSVData } from '../types/CSVData';

const uploadsDir = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir);
}

export const uploadFile = async (req: Request, res: Response) => {
	if (!req.file) {
		return res.status(400).json({ message: 'No file uploaded' });
	}

	const filePath = req.file.path;
	const results: CSVData[] = [];

	fs.createReadStream(filePath)
		.pipe(csv() as unknown as Writable)
		.on('data', (data) => results.push(data))
		.on('end', async () => {
			try {
				await clearUsers();
				await insertUsers(results);

				fs.unlinkSync(filePath);

				res.status(200).json({ message: 'The file was uploaded successfully.' });
			} catch (err) {
				res.status(500).json({ message: 'Error processing the file' });
			}
		})
		.on('error', (err) => {
			res.status(500).json({ message: 'Error processing the file' });
		});
};

export const getUsers = async (req: Request, res: Response) => {
	const query = req.query.q as string;

	try {
		const users = await searchUsers(query);
		res.status(200).json({ data: users });
	} catch (err) {
		res.status(500).json({ message: 'Error querying the database' });
	}
};
