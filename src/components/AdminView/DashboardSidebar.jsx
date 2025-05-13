import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import {
  BoxArrowLeft,
  ChatDots,
  CollectionPlay,
  Film,
  Gear,
  HouseDoor,
  People,
  Tv,
} from "react-bootstrap-icons";
import logoImg from "../../../public/Vector.png";

export default function DashboardSidebar() {

    const getNavLinkClass = ({ isActive }) =>
    `Nav_Link ps-4 py-3 text-decoration-none ${isActive ? "testActive" : ""}`;

  return (
    <div className="sidebar admin-side d-flex flex-column justify-content-between col-xl-2 col-md-3 col-xs-12  rounded-end-5 vh-100 pb-2">
      <div>
        <div className="ms-4 py-5">
          <img src={logoImg} alt="Movie Icon" />
        </div>

        <div className="container ms-2">
          <img
            src="https://th.bing.com/th/id/OIP.5MxizVjWEaUlIbsM0AiAGgHaFj?w=225&h=180&c=7&r=0&o=5&pid=1.7"
            alt="Admin Image"
            style={{ width: "70px", height: "70px", borderRadius: "50%" }}
          />
          <em className=" ms-3 fs-5 pt-2 sec-color">Admin</em>
        </div>

        <Nav className="flex-column mt-4 admin-sidebar">
              <NavLink to='/admin/dashboard' end className={getNavLinkClass}>
                <HouseDoor className="me-2 fs-4 color" /> Dashboard
              </NavLink>
              <NavLink to='dashboard/all' end className={getNavLinkClass}>
                <Film className="me-2 fs-4 color" /> Movies
              </NavLink>
              <NavLink to='/Series' end className={getNavLinkClass}>
                <Tv className="me-2 fs-4 color" /> Series
              </NavLink>
              <NavLink to='/admin/Actors' end className={getNavLinkClass}>
                <CollectionPlay className="me-2 fs-4 color" /> Actors
              </NavLink>
              <NavLink to='/Users' end className={getNavLinkClass}>
                <People className="me-2 fs-4 color" /> Users
              </NavLink>
              <NavLink to='/Comments' end className={getNavLinkClass}>
                <ChatDots className="me-2 fs-4 color" /> Comments
              </NavLink>
              <NavLink to='/Settings' end className={getNavLinkClass}>
                <Gear className="me-2 fs-4 color" /> Settings
              </NavLink>
        </Nav>
      </div>
      <NavLink to='/logout' end className={getNavLinkClass}>
        <BoxArrowLeft className="me-2 fs-4 color" /> Log out
      </NavLink>
    </div>
  );
}
