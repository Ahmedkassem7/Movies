import React from "react";
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
  const navList = [
    {
      icon: HouseDoor,
      text: "Dashboard",
    },
    {
      icon: Film,
      text: "Movies",
    },
    {
      icon: Tv,
      text: "Series",
    },
    {
      icon: CollectionPlay,
      text: "Animes",
    },
    {
      icon: People,
      text: "Users",
    },
    {
      icon: ChatDots,
      text: "Comments",
    },
    {
      icon: Gear,
      text: "Setting",
    },
  ];

  return (
    <div className="sidebar d-flex flex-column justify-content-between col-lg-2 col-md-3 col-sm-4 col-xs-12  rounded-end-5 vh-100 pb-1">
      <div>
        <div className="ms-4 py-5">
          <img src={logoImg} alt="Movie Icon" />
        </div>

        <div className="container ms-2">
          <img
            src="https://th.bing.com/th/id/OIP.5MxizVjWEaUlIbsM0AiAGgHaFj?w=225&h=180&c=7&r=0&o=5&pid=1.7"
            alt="Admin Image"
            style={{ width: "80px", height: "80px", borderRadius: "50%" }}
          />
          <em className=" ms-3 fs-5 pt-2 sec-color">Admin</em>
        </div>

        <Nav className="flex-column mt-4 ">
          {navList.map((nav, index) => {
            const IconComponent = nav.icon;
            return (
              <Nav.Link key={index} className="Nav_Link ps-4 py-3">
                <IconComponent className="me-2 fs-4 color" /> {nav.text}
              </Nav.Link>
            );
          })}
        </Nav>
      </div>
      <Nav.Link className="Nav_Link p-4">
        <BoxArrowLeft className="me-2 fs-4 color" /> Log out
      </Nav.Link>
    </div>
  );
}
