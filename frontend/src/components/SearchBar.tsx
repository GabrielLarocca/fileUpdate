import React, { useState } from 'react';

interface SearchBarProps {
	onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [query, setQuery] = useState('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
		onSearch(event.target.value);
	};

	return (
		<input
			type="text"
			placeholder="Search"
			value={query}
			onChange={handleChange}
			data-testid="search-input"
		/>
	);
};

export default SearchBar;
