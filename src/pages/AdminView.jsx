import { Statistics } from "../components";
import SharedList from "../sharedComponent.jsx/SharedList";
import { getAllMoviesAction } from "../store/movieSlice";
import { getAllSeriesAction } from "./../store/serieSlice";

export default function AdminView() {
  return (
    <div className="d-flex flex-column w-100">
      <Statistics />
      <div className="d-flex flex-column flex-xl-row justify-content-between mt-3 mb-3 g-4">
        <div className="col-12 col-xl-6 mb-4 mb-xl-0">
          <SharedList
            category={"Movies"}
            getAllAction={getAllMoviesAction}
            selectorName="movieSlice"
          />
        </div>
        <div className="col-12 col-xl-6">
          <SharedList
            category={"Series"}
            getAllAction={getAllSeriesAction}
            selectorName="seriesSlice"
          />
        </div>
      </div>
    </div>
  );
}
