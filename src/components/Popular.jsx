import React, { useEffect } from "react";
import { Shared_P, SharedText } from "../styledComponents/styledComponents";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styledComponents/material-you.css";
import { Navigation, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { getAllActorsAction } from "../store/peopleSlice";

export default function Popular({ title, linkPath }) {
  const { people, loading, errors } = useSelector((store) => store.peopleSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllActorsAction());
  }, [dispatch]);

  console.log("people", people);
  console.log("loading", loading);
  console.log("errors", errors);
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }
  return (
    <section className="popular mt-3">
      <div className="row m-0 p-0 justify-content-between by-4">
        <SharedText className="col-lg-4">{title}</SharedText>
        <Link to={linkPath} className="text-decoration-none col-lg-2 text-end">
          <Shared_P>See All...</Shared_P>
        </Link>
      </div>

      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={30}
        centeredSlides={true}
        slidesPerView={4}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        className="material-you-swiper"
      >
        {people.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="slide-card">
              <img src={slide.profile_url} alt={slide.label} />
              <div className="slide-label">{slide.name}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
