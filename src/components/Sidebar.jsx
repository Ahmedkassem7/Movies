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
    <>

      <div className="sidebar d-flex flex-column  justify-content-center align-items-center col-lg-2 col-md-3 col-sm-4 col-xs-12 rounded-end-5 sticky-top">
        <div className="navContainer h-100">
          <div className="d-flex justify-content-center p-4 p-lg-5">
            <img src={logoImg} alt="Movie Icon" />
          </div>

          <Nav className="flex-column lg-mt-4 nav h-100">
            <NavLink to="/" className={getNavLinkClass}>
              <House className="me-2 fs-4" />
              <span className="d-none d-lg-inline">Home</span>
            </NavLink>

            <NavLink to="/movies" className={getNavLinkClass}>
              <Film className="me-2 fs-4" />
              <span className="d-none d-lg-inline">Movies</span>
            </NavLink>

            <NavLink to="/Series" className={getNavLinkClass}>
              <Tv className="me-2 fs-4" />
              <span className="d-none d-lg-inline">TV Series</span>
            </NavLink>

            <NavLink to="/upcoming" className={getNavLinkClass}>
              <Calendar3 className="me-2 fs-4" />
              <span className="d-none d-lg-inline">Upcoming</span>
            </NavLink>
            <Link className="Nav_Link p-4 justify-self-end" to="/logout">
              <BoxArrowLeft className="me-2 fs-4" />
              <span className="d-none d-lg-inline"> Log out</span>
            </Link>
          </Nav>

        </div>


      </div>
    </>

  );
}