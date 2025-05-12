import React from "react";
import { Outlet } from "react-router-dom";

import { Sidebar } from "../components/index";

export default function SharedLayout() {
  return (
    <div className="row p-0 m-0" style={{ backgroundColor: "#191919" }}>
      <Sidebar />
      <div className="col-lg-10 p-5 pt-4">
        <div className="row m-0 p-0 justify-content-between">
          <div className="content mt-4 p-0 col-lg-12">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
