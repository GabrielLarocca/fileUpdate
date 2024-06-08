import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import App from '../pages/App';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App', () => {
	it('uploads a file and displays cards', async () => {
		const file = new File(['name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball'], 'example.csv', { type: 'text/csv' });

		mockedAxios.post.mockResolvedValue({ status: 200, data: { message: 'The file was uploaded successfully.' } });

		mockedAxios.get.mockResolvedValueOnce({
			data: {
				data: [
					{ name: 'John Doe', city: 'New York', country: 'USA', favorite_sport: 'Basketball' },
				],
			},
		});

		mockedAxios.get.mockResolvedValueOnce({
			data: {
				data: [
					{ name: 'John Doe', city: 'New York', country: 'USA', favorite_sport: 'Basketball' },
				],
			},
		});

		await act(async () => {
			render(<App />);
		});

		const input = screen.getByTestId('upload-button') as HTMLInputElement;
		await act(async () => {
			fireEvent.change(input, { target: { files: [file] } });
		});

		await waitFor(() => expect(mockedAxios.post).toHaveBeenCalledTimes(1));
		await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(2));

		const card = screen.getByTestId('info-card');

		expect(card).toHaveTextContent('Name: John Doe');
		expect(card).toHaveTextContent('City: New York');
		expect(card).toHaveTextContent('Country: USA');
		expect(card).toHaveTextContent('Favorite Sport: Basketball');
	});

	it('searches and filters cards', async () => {
		mockedAxios.get.mockResolvedValueOnce({
			data: {
				data: [
					{ name: 'John Doe', city: 'New York', country: 'USA', favorite_sport: 'Basketball' },
					{ name: 'Jane Smith', city: 'London', country: 'UK', favorite_sport: 'Football' },
				],
			},
		});

		mockedAxios.get.mockResolvedValueOnce({
			data: {
				data: [
					{ name: 'Jane Smith', city: 'London', country: 'UK', favorite_sport: 'Football' },
				],
			},
		});

		await act(async () => {
			render(<App />);
		});

		const searchInput = screen.getByTestId('search-input') as HTMLInputElement;

		await act(async () => {
			fireEvent.change(searchInput, { target: { value: 'Jane' } });
		});

		await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(2));

		const cards = screen.getAllByTestId('info-card');

		expect(cards).toHaveLength(1);
		expect(cards[0]).toHaveTextContent('Name: Jane Smith');
		expect(cards[0]).toHaveTextContent('City: London');
		expect(cards[0]).toHaveTextContent('Country: UK');
		expect(cards[0]).toHaveTextContent('Favorite Sport: Football');
	});
});
