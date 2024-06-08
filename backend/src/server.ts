import app from './app';
import { initializeDatabase } from './database/database';

const PORT = 3000;

initializeDatabase().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}).catch((err) => {
	console.error('Failed to initialize database:', err);
});
