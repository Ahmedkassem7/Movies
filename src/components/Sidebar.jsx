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
import { NavLink, Link } from "react-router-dom";

export default function Sidebar() {
  const getNavLinkClass = ({ isActive }) =>
    `Nav_Link ps-4 py-3 text-decoration-none ${isActive ? "testActive" : ""}`;

  return (
    <div className="sidebar d-flex flex-column justify-content-between col-lg-2 col-md-3 col-sm-4 col-xs-12 rounded-end-5 vh-100">
      <div>
        <div className="d-flex justify-content-center p-5">
          <img src={logoImg} alt="Movie Icon" />
        </div>

        <Nav className="flex-column mt-4">
          <NavLink to="/" className={getNavLinkClass}>
            <House className="me-2 fs-4" /> Home
          </NavLink>

          <NavLink to="/movies" className={getNavLinkClass}>
            <Film className="me-2 fs-4" /> Movies
          </NavLink>

          <NavLink to="/Series" className={getNavLinkClass}>
            <Tv className="me-2 fs-4" /> TV Series
          </NavLink>

          <NavLink to="/upcoming" className={getNavLinkClass}>
            <Calendar3 className="me-2 fs-4" /> Upcoming
          </NavLink>
        </Nav>
      </div>

      <Link className="Nav_Link p-4" to="/logout">
        <BoxArrowLeft className="me-2 fs-4" /> Log out
      </Link>
    </div>
  );
}
