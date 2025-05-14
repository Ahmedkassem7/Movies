import { Form } from "react-bootstrap";

export default function BasicInfo({ register, errors, watch , setValue }) {
  const type = watch("Type") || "Movie";
  const titleLabel = type === "Movie" ? "Movie Title" : "Series Title";

  return (
    <>
      <div className="row">
        <Form.Group controlId="formSelectType" className="col-md-6">
          <Form.Label>Select Type</Form.Label>
          <Form.Select
            {...register("Type", {
              required: "Please select a type", 
            })}
            isInvalid={!!errors.Type}  
            onChange={(e) => {
              setValue("Type", e.target.value);
            }}
          >
            <option value="">Select Type</option>  
            <option value="Movie">Movie</option>
            <option value="Series">Series</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.Type?.message}  
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formTitle" className="col-md-6">
          <Form.Label>{titleLabel}</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            {...register("title", { required: "Title is required" })}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
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
              required: "Genre is required",
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
            isInvalid={!!errors.genres}
          />
          <Form.Control.Feedback type="invalid">
            {errors.genres?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formYear" className="col-md-4">
          <Form.Label>Release Date</Form.Label>
          <div className="position-relative">
            <i
              className="bi bi-calendar-date position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ pointerEvents: "none" }}
            ></i>
            <Form.Control
              type="text"
              placeholder="YYYY-MM-DD"
              {...register("release_date", {
                required: "Date is required",
                // min: { value: 1900, message: "Minimum is 1900" },
              })}
              isInvalid={!!errors.release_date}
              className="pe-4"
              style={{ paddingRight: "2.5rem" }}
            />
          </div>
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors.release_date?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formRating" className="col-md-4">
          <Form.Label>Rating</Form.Label>
          <div className="position-relative">
            <i
              className="bi bi-star-fill position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ pointerEvents: "none" }}
            ></i>
            <Form.Control
              type="number"
              placeholder="0-10"
              step="any"
              {...register("vote_average", {
                required: "Rating is required",
                min: { value: 0, message: "Minimum is 0" },
                max: { value: 10, message: "Maximum is 10" },
                valueAsNumber: true,
              })}
              isInvalid={!!errors.vote_average}
              className="pe-4 no-spin"
              style={{ paddingRight: "2.5rem" }}
            />
          </div>
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors.vote_average ? errors.vote_average.message : ""}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
    </>
  );
}
