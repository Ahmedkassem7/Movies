import React from 'react';
import StarRating from './StarRating';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const MovieReviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="p-4 bg-dark rounded mt-4 text-center">
        <p className="text-secondary fst-italic">
          No reviews yet. Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <h3 className="text-white h5 fw-bold mb-4 d-flex align-items-center">
        <span className="me-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="text-custom-accent"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
        </span>
        User Reviews ({reviews.length})
      </h3>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        autoHeight={true}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div
              className="bg-dark rounded p-4 shadow border-start border-4 review-card"
              style={{
                borderColor: '#3DD2CC',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3"
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#3DD2CC',
                    }}
                  >
                    {review.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h5 className="text-white fw-bold mb-1">{review.author}</h5>
                    <StarRating rating={review.author_details?.rating || 0} />
                  </div>
                </div>
                <span className="text-muted small">
                  {new Date().toLocaleDateString()}
                </span>
              </div>

              <p className="text-light mt-2" style={{ lineHeight: '1.6' }}>
                {review.content.split(" ").splice(0,60).join(" ")} ...
              </p>

              <div className="d-flex justify-content-end mt-3 text-muted small">
                <button className="btn btn-link text-decoration-none text-muted d-flex align-items-center me-3 p-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="me-1"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  Helpful
                </button>

                <button className="btn btn-link text-decoration-none text-muted d-flex align-items-center p-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="me-1"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  Reply
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
