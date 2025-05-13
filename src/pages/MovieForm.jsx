import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../Api/MovieApi";
import { useDispatch } from "react-redux";
import { addMovieAction, editMovieAction } from "../store/movieSlice";
import { useEffect } from "react";
// import logoImg from "../../public/Vector.png";
import BasicInfo from "../components/Add/Edit/BasicInfo";
import MediaInputs from "../components/Add/Edit/MediaInputs";
import Cast from "../components/Add/Edit/Cast";

export default function MovieForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  useEffect(() => {
    if (id !== "0") {
      getMovieById(id).then((response) => {
        const movie = response.data;
        console.log("Full movie data:", movie);
console.log("Loaded poster_url:", movie.poster_url);

        const formattedMovie = {
          ...movie,
          genres: Array.isArray(movie.genres)
            ? movie.genres.join(", ")
            : movie.genres
                ?.split(",")
                .map((g) => g.trim())
                .join(", "),

          cast: Array.isArray(movie.cast)
            ? movie.cast.join(", ")
            : movie.cast
                ?.split(",")
                .map((c) => c.trim())
                .join(", "),

          // writer: Array.isArray(movie.writer)
          //   ? movie.writer.join(", ")
          //   : movie.writer
          //       ?.split(",")
          //       .map((w) => w.trim())
          //       .join(", "),

          // director: Array.isArray(movie.director)
          //   ? movie.director.join(", ")
          //   : movie.director
          //       ?.split(",")
          //       .map((d) => d.trim())
          //       .join(", "),
          vote_average: movie.vote_average || 0,
        };

        reset(formattedMovie);
      });
    }
  }, [id, reset]);


  const onSubmit = (data) => {
    const processedData = {
      ...data,
      vote_average: parseFloat(data.vote_average),
      cast: data.cast
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      // Writer: data.Writer.split(", ")
      //   .map((writer) => writer.trim())
      //   .filter(Boolean),
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
          {id === "0" ? "Add Movie" : "Update Movie"}
        </h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <BasicInfo register={register} errors={errors} watch={watch} />
          <MediaInputs register={register} errors={errors} watch={watch} />
          <Cast register={register} errors={errors} />

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
