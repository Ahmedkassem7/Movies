import React from "react";
import logoImg from "../../public/Vector.png";
import { Nav } from "react-bootstrap";
import {
  House,
  Film,
  Tv,
  Calendar3,
  BoxArrowLeft,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar  d-flex flex-column justify-content-between col-lg-2 col-md-3 col-sm-4 col-xs-12  rounded-end-5 vh-100 ">
      <div>
        <div className="d-flex justify-content-center  p-5">
          <img src={logoImg} alt="Movie Icon" />
        </div>
        <Nav className="flex-column mt-4 ">
          <Link className="Nav_Link ps-4 py-3 text-decoration-none" to={"/"}>
            <House className="me-2 fs-4" /> Home
          </Link>
          <Link
            className="Nav_Link ps-4 py-3 text-decoration-none"
            to={"/movies"}
          >
            <Film className="me-2 fs-4" /> Movies
          </Link>
          <Link className="Nav_Link ps-4 py-3 text-decoration-none">
            <Tv className="me-2 fs-4" /> TV Series
          </Link>
          <Link className="Nav_Link ps-4 py-3 text-decoration-none">
            <Calendar3 className="me-2 fs-4" /> Upcoming
          </Link>
        </Nav>
      </div>
      <Link className="Nav_Link p-4">
        <BoxArrowLeft className="me-2 fs-4" /> Log out
      </Link>
    </div>
  );
}
