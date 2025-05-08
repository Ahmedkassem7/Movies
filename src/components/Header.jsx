import React from "react";
import { Form, FormControl } from "react-bootstrap";

export default function Header({ onSearch }) {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="d-flex justify-content-between align-items-center py-3  text-white">
      <Form className="w-75 ">
        <FormControl
          type="text"
          placeholder="Search for movies, TV shows..."
          className="w-100 border-0 rounded-pill  text-white p-2"
          style={{
            backgroundColor: "#2b2b2b",
            color: "rgba(102, 102, 102, 1)",
          }}
          onChange={handleSearch}
          aria-label="Search"
        />
      </Form>
      <div className="profile-icon">
        <img
          src="https://randomuser.me/api/portraits/women/1.jpg"
          alt="profile"
          className="rounded-circle"
          width="40"
        />
      </div>
    </div>
  );
}
