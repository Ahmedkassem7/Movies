import { useForm } from "react-hook-form";
import { Button, Form, Toast } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getMovieById, updateMovie, addNewMovie } from "../Api/MovieApi";
import { useDispatch } from "react-redux";
import { addMovieAction, editMovieAction } from "../store/movieSlice";
import { useEffect, useState } from "react";
import { getSerieById, updateSerie, addNewSerie } from "../Api/SeriesApi";
import { AddSeriesAction, UpdateSeriesAction } from "../store/serieSlice";
import BasicInfo from "../components/Add&Edit/BasicInfo";
import MediaInputs from "../components/Add&Edit/MediaInputs";
import Cast from "../components/Add&Edit/Cast";

export default function MovieForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [initialCastData, setInitialCastData] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    control,
  } = useForm();
  const type = watch("Type") || "Movie";

  useEffect(() => {
    const fetchData = async () => {
      if (id !== "0") {
        let response;
        if (pathname.includes("movie")) {
          response = await getMovieById(id);
        } else if (pathname.includes("series")) {
          response = await getSerieById(id);
        }

        if (response?.data) {
          const item = response.data;
          const castArray = Array.isArray(item.cast)
            ? item.cast
            : item.cast
                ?.split(",")
                .map((c) => c.trim())
                .filter(Boolean) || [];

          const formattedItem = {
            ...item,
            genres: Array.isArray(item.genres)
              ? item.genres.join(",")
              : item.genres
                  ?.split(",")
                  .map((g) => g.trim())
                  .join(","),
            cast: castArray,
            vote_average: item.vote_average || 0,
            Type: pathname.includes("movie") ? "Movie" : "Series",
          };
          reset({
            ...formattedItem,
            cast: castArray,
          });
          setInitialCastData(castArray);
        }
      } else {
        setInitialCastData([]);
        reset({
          vote_average: "",
          Type: pathname.includes("movie") ? "Movie" : "Series",
        });
      }
    };

    fetchData();
  }, [id, reset, pathname, setValue]);

  const onSubmit = async (data) => {
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

    console.log("Processed data:", processedData);

    if (id === "0") {
      let response;
      if (data.Type === "Movie") {
        console.log("Adding new movie...");

        response = await addNewMovie(processedData);
        if (response?.data?.id) {
          console.log("Dispatching addMovieAction...");
          dispatch(addMovieAction(response.data));

          setShowToast(true);
          setTimeout(() => {
            navigate("/admin/movies/all");
          }, 2000);
        } else {
          console.error("Failed to add movie");
        }
      } else if (data.Type === "Series") {
        console.log("Adding new series...");

        response = await addNewSerie(processedData);
        if (response?.data?.id) {
          console.log("Dispatching AddSeriesAction...");
          dispatch(AddSeriesAction(response.data));

          setShowToast(true);
          setTimeout(() => {
            navigate("/admin/series/all");
          }, 2000);
        } else {
          console.error("Failed to add series");
        }
      }
    } else {
      if (data.Type === "Movie") {
        await updateMovie(id, processedData);
        navigate(`/movie/${id}`);
        dispatch(editMovieAction({ id, movie: processedData }));
      } else if (data.Type === "Series") {
        console.log(id, processedData);
        await updateSerie(id, processedData);
        const updatedData = await getSerieById(id);
        dispatch(UpdateSeriesAction({ id, serie: updatedData.data }));
        navigate(`/series/${id}`);
      }
    }
  };

  return (
    <div className="movie-form-wrapper">
      <div className="movie-form-container text-light">
        <h1 className="form-title mb-3">
          {id === "0"
            ? `Add New ${type.charAt(0).toUpperCase() + type.slice(1)}`
            : `Update ${type.charAt(0).toUpperCase() + type.slice(1)}`}
        </h1>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <BasicInfo
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
          <MediaInputs
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
          <Cast
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            control={control}
            initialCast={initialCastData}
          />

          <div className="d-flex justify-content-between">
            <Button className="form-btn1" type="submit">
              {id === "0" ? "Add" : "Update"}{" "}
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
            <Button
              className="form-btn2 bg-danger ms-2"
              onClick={() => navigate("/admin/dashboard")}
            >
              Cancel
            </Button>
          </div>
        </Form>

        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="success"
          className="custom-toast"
        >
          <Toast.Body>
            <strong>
              {type.charAt(0).toUpperCase() + type.slice(1)} Added Successfully!
            </strong>
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
}
