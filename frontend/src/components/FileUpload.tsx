import React from 'react';

interface FileUploadProps {
	onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			onFileUpload(event.target.files[0]);
		}
	};

	return (
		<div>
			<input
				type="file"
				onChange={handleFileChange}
				data-testid="upload-button"
				style={{ display: 'none' }}
				id="upload-file"
			/>
			<label htmlFor="upload-file">
				<button type="button">Upload</button>
			</label>
		</div>
	);
};

export default FileUpload;
