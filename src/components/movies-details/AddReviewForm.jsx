import React, { useState } from 'react';
import StarRating from './StarRating';

export const AddReviewForm = ({ onSubmit }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ author, content, rating });
    setSubmitted(true);

    setTimeout(() => {
      setAuthor('');
      setContent('');
      setRating(0);
      setSubmitted(false);
      setIsExpanded(false);
    }, 2000);
  };

  const charactersLeft = 500 - content.length;

  return (
    <div className="mt-5 bg-dark rounded shadow overflow-hidden">
      <div className="px-4 py-3 text-white" style={{ background: '#3DD2CC' }}>
        <h3 className="h5 fw-bold d-flex align-items-center m-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            className="me-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Share Your Thoughts
        </h3>
      </div>

      {submitted ? (
        <div className="p-4 bg-success text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            className="text-light mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-white fs-5 mt-2">Thank you for your review!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4">
          {!isExpanded ? (
            <div
              onClick={() => setIsExpanded(true)}
              className="bg-secondary text-light rounded p-3 text-center"
              style={{ cursor: 'pointer' }}
            >
              Click here to write a review...
            </div>
          ) : (
            <>
              <div className="mb-3">
                <label className="form-label text-light">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="form-control bg-secondary text-white border-0"
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-light">Your Rating</label>
                <StarRating
                  rating={rating}
                  setRating={setRating}
                  interactive={true}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-light d-flex justify-content-between">
                  <span>Your Review</span>
                  <span
                    className={`small ${
                      charactersLeft < 50 ? 'text-danger' : 'text-muted'
                    }`}
                  >
                    {charactersLeft} characters left
                  </span>
                </label>
                <textarea
                  className="form-control bg-secondary text-white border-0"
                  placeholder="Share your thoughts about this movie..."
                  value={content}
                  onChange={(e) => setContent(e.target.value.slice(0, 500))}
                  required
                  maxLength={500}
                  rows={5}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="btn btn-outline-light btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn text-white d-flex align-items-center"
                  style={{ backgroundColor: '#3DD2CC' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="me-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  Submit Review
                </button>
              </div>
            </>
          )}
        </form>
      )}
    </div>
  );
};
