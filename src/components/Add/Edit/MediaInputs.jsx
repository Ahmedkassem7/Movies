import { Form } from "react-bootstrap";

export default function MediaInputs({ register, errors, watch }) {
  const poster = watch("poster");
  const trailer = watch("trailer_url");


  return (
    <>
      <div className="row">
        <Form.Group controlId="formPoster" className="col-md-6">
          <Form.Label>Poster URL</Form.Label>
          <div className="position-relative">
            <Form.Control
              type="text"
              placeholder="https://example.com/image.jpg"
              {...register("poster", {
                required: "Poster link is required",
              })}
              isInvalid={!!errors.poster}
              className="pe-4"
              style={{ paddingRight: "2.5rem" }}
            />
            {!poster && (
              <i
                className="bi bi-file-image position-absolute top-50 end-0 translate-middle-y me-3"
                style={{ pointerEvents: "none" }}
              ></i>
            )}
          </div>
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors.poster?.message}
          </Form.Control.Feedback>
        </Form.Group>


        

        <Form.Group controlId="formTrailer" className="col-md-6">
          <Form.Label>Trailer</Form.Label>
          <div className="position-relative">
            <Form.Control
              type="text"
              placeholder="https://example.com/trailer.mp4"
              {...register("trailer_url", {
                required: "Trailer link is required",
              })}
              isInvalid={!!errors.trailer_url}
              className="pe-4"
              style={{ paddingRight: "2.5rem" }}
            />
            {!trailer && (
              <i
                className="bi bi-film position-absolute top-50 end-0 translate-middle-y me-3"
                style={{ pointerEvents: "none" }}
              ></i>
            )}
          </div>
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors.trailer_url?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <Form.Group controlId="formOverview">
        <Form.Label>Plot</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a brief summary of the movie plot"
          {...register("overview", { required: "Plot is required" })}
          isInvalid={!!errors.overview}
        />
        <Form.Control.Feedback type="invalid">
          {errors.overview?.message}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
}
