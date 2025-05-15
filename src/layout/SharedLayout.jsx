import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { LoadingLineReveal, Sidebar } from "../components/index";

export default function SharedLayout() {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("hasSeenReveal");

    if (!hasSeen) {
      setShowAnimation(true);
      sessionStorage.setItem("hasSeenReveal", "true");

      // Hide after 2.5 seconds
      setTimeout(() => {
        setShowAnimation(false);
      }, 2500);
    }
  }, []);

  if (showAnimation) {
    return (
      <div className="vh-100 bg-black d-flex justify-content-center align-items-center">
        <LoadingLineReveal textContent="Welcome to MovieWorld 🎬" />
      </div>
    );
  }

  return (
    <div className="row p-0 m-0" style={{ backgroundColor: "#191919" }}>
      <Sidebar />
      <div className="col-lg-10 px-5">
        <div className="row m-0 p-0 justify-content-between">
          <div className="content mt-4 p-0 col-lg-12">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
