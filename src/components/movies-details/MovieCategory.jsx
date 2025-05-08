import React from 'react';

export default function MovieCategory({ title }) {
  return (
    <span
      className="btn "
      style={{
        backgroundColor: '#191919',
        border: '1px solid white',
        color: 'white',
        borderRadius: '15px',
        textAlign: 'center',
        margin: '0 5px',
      }}
    >
      {title}
    </span>
  );
}
