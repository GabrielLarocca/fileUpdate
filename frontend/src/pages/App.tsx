import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileUpload from '../components/FileUpload';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import { CSVData } from '../types/CSVData';
import { API_URL } from '../constants';

const App: React.FC = () => {
	const [csvData, setCsvData] = useState<CSVData[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>('');

	useEffect(() => {
		fetchCsvData();
	}, []);

	useEffect(() => {
		if (searchQuery !== '') {
			fetchCsvData(searchQuery);
		}
	}, [searchQuery]);

	const handleFileUpload = async (file: File) => {
		const formData = new FormData();
		formData.append('file', file);

		try {
			const response = await axios.post(`${API_URL}/api/files`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			});

			if (response.status === 200) {
				fetchCsvData();
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error('Error uploading file:', error.response?.data || error.message);
			} else {
				console.error('Unknown error:', error);
			}
		}
	};

	const fetchCsvData = async (query: string = '') => {
		try {
			const response = await axios.get(`${API_URL}/api/users?q=${query}`);

			if (response.data && Array.isArray(response.data.data)) {
				setCsvData(response.data.data);
			} else {
				console.error('Invalid response structure:', response.data);
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error('Error fetching data:', error.response?.data || error.message);
			} else {
				console.error('Unknown error:', error);
			}
		}
	};

	const handleSearch = (query: string) => {
		setSearchQuery(query);
	};

	return (
		<div className="App">
			<div className="header">
				<SearchBar onSearch={handleSearch} />
				<FileUpload onFileUpload={handleFileUpload} />
			</div>

			<div className="cards-container">
				{csvData.map((item, index) =>
					<Card key={index} data={item} />
				)}
			</div>
		</div>
	);
};

export default App;
