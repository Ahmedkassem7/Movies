import React from 'react';

export default function MovieCastInfo({ data }) {
  const { poistions, names } = data;

  return (
    <div style={{ marginTop: '10px', color: 'white' }}>
      <p>
        <strong>{poistions}:</strong>{' '}
        <span style={{ color: '#3DD2CC' }}>{names}</span>
      </p>
      <hr />
    </div>
  );
}
