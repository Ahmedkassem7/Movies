import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams ,useLocation } from "react-router-dom";
import { getMovieById } from "../Api/MovieApi";
import { useDispatch } from "react-redux";
import { addMovieAction, editMovieAction } from "../store/movieSlice";
import { useEffect, useState } from "react";
// import logoImg from "../../public/Vector.png";
import BasicInfo from "../components/Add&Edit/BasicInfo";
import MediaInputs from "../components/Add&Edit/MediaInputs";
import Cast from "../components/Add&Edit/Cast";
import { Type } from "react-bootstrap-icons";

export default function MovieForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [initialCastData, setInitialCastData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();
  const type = watch("Type") || "Movie";

  useEffect(() => {
    if (id !== "0") {
      getMovieById(id).then((response) => {
        const movie = response.data;
        console.log("Full movie data:", movie);
        console.log("Loaded poster_url:", movie.poster_url);

        const castArray = Array.isArray(movie.cast)
          ? movie.cast
          : movie.cast
              ?.split(", ")
              .map((c) => c.trim())
              .filter(Boolean) || [];

        const formattedMovie = {
          ...movie,
          genres: Array.isArray(movie.genres)
            ? movie.genres.join(", ")
            : movie.genres
                ?.split(", ")
                .map((g) => g.trim())
                .join(", "),

          cast: castArray.join(", "),
          vote_average: movie.vote_average || 0,

        };

        reset(formattedMovie);
        setInitialCastData(castArray);

        const isMovie = pathname.includes("movie");
        setValue("Type", isMovie ? "Movie" : "Series");
      });
    } else {
      setInitialCastData([]);
      reset({
        vote_average: "",
        Type: "Movie",
      });
    }
  }, [id, reset,pathname, setValue]);

  const onSubmit = (data) => {
    const processedData = {
      ...data,
      vote_average: parseFloat(data.vote_average),
      cast: Array.isArray(data.cast)
        ? data.cast.filter(Boolean)
        : data.cast
            ?.split(",")
            .map((c) => c.trim())
            .filter(Boolean) || [],

      genres: data.genres
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean),
    };

    // console.log("Processed data:", processedData);

    if (id === "0") {
      dispatch(addMovieAction(processedData));
      navigate("/admin/dashboard/all");
    } else {
      dispatch(editMovieAction({ id, movie: processedData }));
      navigate(`/movie/${id}`);
    }
  };

  return (
    <div className="movie-form-wrapper">
      <div className="movie-form-container text-light">
        {/* <img src={logoImg} alt="Logo" className="mb-4" /> */}
        <h1 className="form-title  mb-3">
          {id === "0"
            ? `Add New ${type.charAt(0).toUpperCase() + type.slice(1)}`
            : `Update ${type.charAt(0).toUpperCase() + type.slice(1)}`}
        </h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <BasicInfo register={register} errors={errors} watch={watch} setValue={setValue} />
          <MediaInputs register={register} errors={errors} watch={watch} setValue={setValue} />
          <Cast
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            initialCast={initialCastData}
          />

          {/* You can also add extra fields directly here if needed */}

          <div className="d-flex justify-content-between">
            <Button className="form-btn1" type="submit">
              {id === "0" ? "Add Movie" : "Update Movie"}
            </Button>
            <Button
              className="form-btn2 bg-danger ms-2"
              onClick={() => navigate("/admin/dashboard")}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
