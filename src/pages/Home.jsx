import { Banner, MovieSection, Popular } from "../components/index";
export default function Home() {
  return (
    <div className="row p-0 m-0" style={{ backgroundColor: "#191919" }}>
      <div className="content p-0  col-lg-12">
        <Banner />
        <MovieSection
          title="Trending Movies"
          sliceStart={0}
          sliceEnd={4}
          linkPath="/Movies"
        />
        <MovieSection
          title="Upcoming"
          sliceStart={4}
          sliceEnd={8}
          linkPath="/Movies"
        />
        <Popular title="Popular" linkPath="/Popular" />
      </div>
    </div>
  );
}
