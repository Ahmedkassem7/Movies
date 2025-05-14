import MediaList from "../components/MediaList";
import { getAllMoviesAction, searchMovieAction } from "../store/movieSlice";

export default function Movies() {
  return (
    <MediaList
      fetchAction={(search) =>
        search ? searchMovieAction(search) : getAllMoviesAction()
      }
      mediaSelector={(store) => ({
        data: store.movieSlice.movies,
        loading: store.movieSlice.loading,
        error: store.movieSlice.error,
      })}
      title="Movies"
      type="movie"
    />
  );
}
