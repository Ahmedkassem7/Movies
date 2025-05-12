import { Form } from "react-bootstrap";

export default function BasicInfo({ register, errors }) {
  //   const type = watch("Type") || "movie";

  return (
    <>
      <div className="row">
        <Form.Group controlId="formTitle" className="col-md-6">
          <Form.Label>Type</Form.Label>
          <Form.Select
            {...register("Type", { required: "Type is required" })}
            isInvalid={!!errors.Type}
          >
            <option value="">Select type</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.Type?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formTitle" className="col-md-6">
          <Form.Label>Movie Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            {...register("title", { required: "Title is required" })}
            isInvalid={!!errors.Title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.Title?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="row">
        <Form.Group controlId="formgenre" className="col-md-4">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. Action, Drama, Thriller"
            {...register("genres", {
              required: "Genre name is required",
              validate: (value) => {
                const genreList = value
                  .split(",")
                  .map((genre) => genre.trim())
                  .filter(Boolean);
                return (
                  genreList.length >= 1 || "At least one genre is required"
                );
              },
            })}
            isInvalid={!!errors.Genre}
          />
          <Form.Control.Feedback type="invalid">
            {errors.Genre?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formYear" className="col-md-4">
          <Form.Label>Release Year</Form.Label>
          <div className="position-relative">
            <i className="bi bi-calendar-date position-absolute top-50 end-0 translate-middle-y me-3"></i>
            <Form.Control
              type="text"
              placeholder="YYYY"
              {...register("Year", {
                required: "Year is required",
                min: { value: 1900, message: "Year must be after 1900" },
              })}
              isInvalid={!!errors.Year}
            />
          </div>
          <Form.Control.Feedback type="invalid">
            {errors.Year?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formRating" className="col-md-4">
          <Form.Label>IMDb Rating</Form.Label>
          <div className="position-relative">
            <i className="bi bi-star-fill position-absolute top-50 end-0 translate-middle-y me-3"></i>
            <Form.Control
              type="text"
              placeholder="0-10"
              {...register("vote_average", {
                required: "Rating is required",
                min: { value: 0, message: "Minimum is 0" },
                max: { value: 10, message: "Maximum is 10" },
              })}
              isInvalid={!!errors.imdbRating}
            />
          </div>
          <Form.Control.Feedback type="invalid">
            {errors.imdbRating?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
    </>
  );
}
