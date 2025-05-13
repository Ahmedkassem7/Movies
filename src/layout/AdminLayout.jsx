import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "../components";
export default function adminLayout() {
  return (
    <>
      <div
        className="row p-0 m-0 min-vh-100"
        style={{ backgroundColor: "#191919" }}
      >
        <DashboardSidebar />
        <div className="col-12 col-lg-9 col-xl-10 px-1 px-xl-4 pt-2">
          <div className="row m-0 p-0">
            <div className="content  p-0 w-100">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
