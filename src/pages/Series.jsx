import MediaList from "../components/MediaList";
import { getAllSeriesAction, searchSeriesAction } from "../store/serieSlice";

export default function Series() {
  return (
    <MediaList
      // fetchAction={getAllSeriesAction}
      fetchAction={(search) =>
        search ? searchSeriesAction(search) : getAllSeriesAction()
      }
      mediaSelector={(store) => ({
        data: store.seriesSlice.series,
        loading: store.seriesSlice.loading,
        error: store.seriesSlice.error,
      })}
      title="Series"
      enableFilters={true} // if no filters needed
      type="series"
    />
  );
}
