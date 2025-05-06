import React, { useState } from 'react';

export default function MovieTrailer({ videoKey }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!videoKey) {
    return <p>No trailer available.</p>;
  }

  const videoUrl = `https://www.youtube.com/embed/${videoKey}?autoplay=1`;

  const handlePlay = () => {
    setIsPlaying(true);
    setIsLoading(true);
  };

  return (
    <div
      className=" mt-5"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        height: '430px',
        // aspectRatio: '16 / 9',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      }}
    >
      {!isPlaying && (
        <>
          <img
            src="https://image.tmdb.org/t/p/w500/86z1Yrwj7yN1xehSa0gIwHnR7xl.jpg"
            alt="Trailer Poster"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'fill',
            }}
          />
          <button
            onClick={handlePlay}
            aria-label="Play Trailer"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              border: 'none',
              borderRadius: '50%',
              width: '64px',
              height: '64px',
              color: '#fff',
              fontSize: '28px',
              cursor: 'pointer',
            }}
          >
            ▶
          </button>
        </>
      )}

      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '4px',
            width: '100%',
            background: 'linear-gradient(to right, #ff0000, #ffc107, #00ff00)',
            animation: 'loading 1.2s linear infinite',
            zIndex: 10,
          }}
        />
      )}

      {isPlaying && (
        <iframe
          src={videoUrl}
          title="Movie Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      )}

      <style>
        {`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
}
