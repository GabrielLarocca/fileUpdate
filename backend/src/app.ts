import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadFile, getUsers } from './controllers/userController';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const cors = require('cors');

const allowedOrigins = [
	'https://fileupdate-frontend-p03ni1tu7-gabriellaroccas-projects.vercel.app/',
	'http://localhost:4000',
];

const corsOptions = {
	origin: (origin: any, callback: any) => {
		if (allowedOrigins.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};

app.use(cors(corsOptions));

const uploadsDir = path.join(__dirname, 'uploads');
const upload = multer({ dest: uploadsDir });

// Routes
app.post('/api/files', upload.single('file'), uploadFile);
app.get('/api/users', getUsers);

// Middlewares
app.use(errorHandler);

export default app;
