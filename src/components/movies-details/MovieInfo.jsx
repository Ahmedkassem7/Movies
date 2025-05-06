import React from 'react';
import MovieCategory from './MovieCategory';

export default function MovieInfo() {
  const title = 'Top Gun: Maverick';
  const releaseYear = 2022;
  const dureation = '2h 10m';

  return (
    <div style={{ color: 'white', marginTop: '20px' }}>
      <p style={{ fontSize: '23px', fontWeight: 500 }}>
        <span>{title}</span> • {releaseYear} • {dureation}{' '}
        <MovieCategory title={'action'} />
      </p>

      <p style={{ fontSize: '20px', fontWeight: 400 }}>
        After thirty years, Maverick is still pushing the envelope as a top
        naval aviator, but must confront ghosts of his past when he leads TOP
        GUN's elite graduates on a mission that demands the ultimate sacrifice
        from those chosen to fly it.
      </p>
    </div>
  );
}
