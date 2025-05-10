import { Form } from "react-bootstrap";

export default function MedidaInputs({ register, errors, watch }) {
  const poster = watch("Poster");
  const trailer = watch("Trailer");

  return (
    <>
      <Form.Group controlId="formPoster">
        <Form.Label>Poster URL</Form.Label>
        <div className="position-relative">
          {!poster && (
            <i className="bi bi-file-image position-absolute top-50 end-0 translate-middle-y me-3"></i>
          )}
          <Form.Control
            type="text"
            placeholder="https://example.com/image.jpg"
            {...register("Poster", { required: "Poster link is required" })}
            isInvalid={!!errors.Poster}
          />
        </div>
        <Form.Control.Feedback type="invalid">
          {errors.Poster?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formTrailer">
        <Form.Label>Trailer</Form.Label>
        <div className="position-relative">
          {!trailer && (
            <i className="bi bi-film position-absolute top-50 end-0 translate-middle-y me-3"></i>
          )}
          <Form.Control
            type="text"
            placeholder="https://example.com/trailer.mp4"
            {...register("Trailer", {
              required: "Trailer link is required",
            })}
            isInvalid={!!errors.Trailer}
          />
        </div>
        <Form.Control.Feedback type="invalid">
          {errors.Trailer?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formOverview">
        <Form.Label>Plot</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a brief summary of the movie plot"
          {...register("Plot", { required: "Plot is required" })}
          isInvalid={!!errors.Plot}
        />
        <Form.Control.Feedback type="invalid">
          {errors.Plot?.message}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
}
