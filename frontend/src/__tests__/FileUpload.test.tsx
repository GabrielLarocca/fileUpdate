import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileUpload from '../components/FileUpload';

describe('FileUpload', () => {
	it('calls onFileUpload when a file is selected', async () => {
		const onFileUpload = jest.fn();

		render(<FileUpload onFileUpload={onFileUpload} />);

		const input = screen.getByTestId('upload-button') as HTMLInputElement;
		const file = new File(['dummy content'], 'example.csv', { type: 'text/csv' });

		await act(async () => {
			fireEvent.change(input, { target: { files: [file] } });
		});

		expect(onFileUpload).toHaveBeenCalledTimes(1);
		expect(onFileUpload).toHaveBeenCalledWith(file);
	});
});
