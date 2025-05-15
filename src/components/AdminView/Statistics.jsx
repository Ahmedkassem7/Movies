import React, { useEffect, useState } from "react";
import { Film, People, Tv } from "react-bootstrap-icons";
import { getActorCount } from "../../Api/ActorsApi";
import { getSeriesCount } from "../../Api/SeriesApi";
import { getMovieCount } from "../../Api/MovieApi";
import { getUserCount } from "../../Api/UsersAPI";

export default function Statistics() {
  const [statistics, setStatistics] = useState({
    movies: 0,
    tvShows: 0,
    users: 0,
    actors: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userCount = await getUserCount();
        const movieCount = await getMovieCount();
        const seriesCount = await getSeriesCount();
        const actorsCount = await getActorCount();

        setStatistics({
          movies: movieCount,
          tvShows: seriesCount,
          users: userCount,
          actors: actorsCount,
        });
      } catch (error) {
        console.error("Failed to load statistics:", error);
      }
    };

    fetchData();
  }, []);

  const statisticsList = [
    {
      icon: Film,
      number: statistics.movies,
      text: "Movies",
    },
    {
      icon: Tv,
      number: statistics.tvShows,
      text: "Series",
    },
    {
      icon: People,
      number: statistics.users,
      text: "Users",
    },
    {
      icon: People,
      number: statistics.actors,
      text: "Actors",
    },
  ];

  return (
    <div className="d-flex w-100 container justify-content-around col-6 col-sm-4 col-md-3 flex-wrap">
      {statisticsList.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div
            key={index}
            className="py-2 rounded-4 m-2 position-relative stat-card"
          >
            <div className="d-flex align-items-center justify-content-center">
              <IconComponent className="fs-3 color me-3" />
              <span className="sec-color fs-2 font">{item.number}</span>
            </div>
            <em className="sec-color font text-center fs-5 d-block">
              {item.text}
            </em>
          </div>
        );
      })}
    </div>
  );
}
