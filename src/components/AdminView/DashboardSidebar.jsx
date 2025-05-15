import { Nav } from "react-bootstrap";
import {
  BoxArrowLeft,
  CollectionPlay,
  Film,
  HouseDoor,
  Tv,
} from "react-bootstrap-icons";
import { Link, NavLink } from "react-router-dom";
import logoImg from "../../../public/Vector.png";

export default function DashboardSidebar() {
  const getNavLinkClass = ({ isActive }) =>
    `Nav_Link ps-4 py-3 my-1 text-decoration-none ${
      isActive ? "testActive" : ""
    }`;
  const logOut = () => {
    localStorage.removeItem("user");
    console.log("Logout");

    window.location.href = "/login";
  };
  return (
    <div className="sidebar admin-side d-flex flex-column justify-content-between col-xl-2 col-md-3 col-xs-12 rounded-end-5 vh-100 pb-2">
      <div>
        <div className="ms-4 pt-5">
          <img src={logoImg} alt="Movie Icon" />
        </div>

        <Nav className="flex-column mt-5 admin-sidebar">
          <NavLink to="/admin/dashboard" end className={getNavLinkClass}>
            <HouseDoor className="me-2 fs-4 color" /> Dashboard
          </NavLink>
          <NavLink to="movies/all" end className={getNavLinkClass}>
            <Film className="me-2 fs-4 color" /> Movies
          </NavLink>
          <NavLink to="series/all" end className={getNavLinkClass}>
            <Tv className="me-2 fs-4 color" /> Series
          </NavLink>
          <NavLink to="/admin/Actors" end className={getNavLinkClass}>
            <CollectionPlay className="me-2 fs-4 color" /> Actors
          </NavLink>
        </Nav>
      </div>
      <Link
        to="/login"
        end
        className={`${getNavLinkClass} NavLink text-light`}
        onClick={logOut}
      >
        <BoxArrowLeft className="me-2 fs-4 color" /> Log out
      </Link>
    </div>
  );
}
