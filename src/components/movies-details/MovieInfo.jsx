import React from 'react';
import MovieCategory from './MovieCategory';

export default function MovieInfo({ movieInfo }) {
  return (
    <div style={{ color: 'white', marginTop: '20px' }}>
      <p style={{ fontSize: '23px', fontWeight: 500 }}>
        <span>{movieInfo.title}</span> • {movieInfo.year} •{' '}
        {movieInfo.dureation}{' '}
        {movieInfo.category.map((gen, index) => (
          <MovieCategory key={index} title={gen} />
        ))}
      </p>

      <p style={{ fontSize: '20px', fontWeight: 400 }}>{movieInfo.plot}</p>
    </div>
  );
}
