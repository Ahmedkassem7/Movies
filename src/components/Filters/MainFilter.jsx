import React from "react";
import FilterSection from "./FilterSection";

export default function MainFilter() {
  const categories = [
    "Action",
    "Adventure",
    "Animated",
    "Comedy",
    "Crime",
    "Fantasy",
  ];
  const services = [
    "Netflix",
    "Prime video",
    "Disney +",
    "HBO max",
    "Hulu",
    "Starz",
  ];

  return (
    <div className="filters mt-4  col-lg-3 text-light">
      <div className="col-lg-12  ">
        <FilterSection title="Categories" options={categories} />
        <FilterSection title="services" options={services} />
      </div>
    </div>
  );
}
