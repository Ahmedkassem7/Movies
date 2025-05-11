import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../Api/MovieApi";
import { useDispatch } from "react-redux";
import { addMovieAction, editMovieAction } from "../store/movieSlice";
import { useEffect } from "react";
import logoImg from "../../public/Vector.png";
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

  const type = watch("Type") || "Movie";

  useEffect(() => {
    if (id !== "0") {
      getMovieById(id).then((response) => {
        const movie = response.data;

        const formattedMovie = {
          ...movie,
          Genre: Array.isArray(movie.genres)
            ? movie.genres.join(", ")
            : movie.genres?.split(",")
                .map((g) => g.trim())
                .join(", "),

          Actors: Array.isArray(movie.Actors)
            ? movie.Actors.join(", ")
            : movie.Actors?.split(",")
                .map((a) => a.trim())
                .join(", "),

          Writer: Array.isArray(movie.Writer)
            ? movie.Writer.join(", ")
            : movie.Writer?.split(",")
                .map((w) => w.trim())
                .join(", "),
        };
        reset(formattedMovie);
      });
    }
  }, [id, reset]);

  const onSubmit = (data) => {
    const processedData = {
      ...data,
      Actors: data.Actors.split(", ")
        .map((actor) => actor.trim())
        .filter(Boolean),
      Writer: data.Writer.split(", ")
        .map((writer) => writer.trim())
        .filter(Boolean),
    };

    if (id === "0") {
      dispatch(addMovieAction(processedData));
    } else {
      dispatch(editMovieAction({ id, movie: processedData }));
    }
    navigate("/AdminView");
  };

  return (
    <div className="movie-form-wrapper">
      <div className="movie-form-container text-light">
        <img src={logoImg} alt="Logo" className="mb-4" />
        <h1 className="form-title text-center mb-3">
          {id === "0"
            ? `Add New ${type.charAt(0).toUpperCase() + type.slice(1)}`
            : `Update ${type.charAt(0).toUpperCase() + type.slice(1)}`}
        </h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <BasicInfo register={register} errors={errors} watch={watch} />
          <MediaInputs register={register} errors={errors} watch={watch} />
          <Cast register={register} errors={errors} />

          <div className="d-flex justify-content-between">
            <Button className="form-btn1" type="submit">
              {id === "0" ? "Add Movie" : "Update Movie"}
            </Button>
            <Button
              className="form-btn2 bg-danger ms-2"
              onClick={() => navigate("/AdminView")}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
