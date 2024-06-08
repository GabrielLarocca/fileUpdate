import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadFile, getUsers } from './controllers/userController';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const uploadsDir = path.join(__dirname, 'uploads');
const upload = multer({ dest: uploadsDir });

// Routes
app.post('/api/files', upload.single('file'), uploadFile);
app.get('/api/users', getUsers);

// Middlewares
app.use(errorHandler);

export default app;
