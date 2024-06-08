import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../components/Card';
import { CSVData } from '../types/CSVData';

describe('Card', () => {
	it('displays the data correctly', () => {
		const data: CSVData = {
			name: 'John Doe',
			city: 'New York',
			country: 'USA',
			favorite_sport: 'Basketball',
		};

		render(<Card data={data} />);

		const card = screen.getByTestId('info-card');

		expect(card).toHaveTextContent('Name: John Doe');
		expect(card).toHaveTextContent('City: New York');
		expect(card).toHaveTextContent('Country: USA');
		expect(card).toHaveTextContent('Favorite Sport: Basketball');
	});
});
