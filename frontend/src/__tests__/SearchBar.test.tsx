import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
	it('calls onSearch when the input value changes', async () => {
		const onSearch = jest.fn();

		render(<SearchBar onSearch={onSearch} />);

		const input = screen.getByTestId('search-input') as HTMLInputElement;

		await act(async () => {
			fireEvent.change(input, { target: { value: 'test' } });
		});

		expect(onSearch).toHaveBeenCalledTimes(1);
		expect(onSearch).toHaveBeenCalledWith('test');
	});
});
