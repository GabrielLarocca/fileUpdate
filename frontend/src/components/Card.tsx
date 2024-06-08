import React from 'react';
import { CSVData } from '../types/CSVData';

interface CardProps {
	data: CSVData;
}

const Card: React.FC<CardProps> = ({ data }) => {
	return (
		<div className="card" data-testid="info-card">
			<p>Name: {data.name}</p>
			<p>City: {data.city}</p>
			<p>Country: {data.country}</p>
			<p>Favorite Sport: {data.favorite_sport}</p>
		</div>
	);
};

export default Card;
