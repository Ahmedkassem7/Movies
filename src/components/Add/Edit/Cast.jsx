import { Form } from "react-bootstrap";

export default function Cast({ register, errors }) {
  return (
    <>
      <div className="row">
        {/* <Form.Group controlId="formDirector" className="col-md-6">
          <Form.Label>Director</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. Steven Spielberg"
            {...register("Director", {
              required: "Director name is required",
            })}
            isInvalid={!!errors.Director}
          />
          <Form.Control.Feedback type="invalid">
            {errors.Director?.message}
          </Form.Control.Feedback>
        </Form.Group> */}

        <Form.Group controlId="formActors" className="col-md-6">
          <Form.Label>Cast</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter at least 3 names, separated by commas"
            {...register("cast", {
              required: "Cast names are required",
              validate: (value) => {
                const castList = value
                  .split(",")
                  .map((cast) => cast.trim())
                  .filter(Boolean);
                return (
                  castList.length >= 3 || "At least three cast names are required"
                );
              },
            })}
            isInvalid={!!errors.cast}
          />
          <Form.Control.Feedback type="invalid">
            {errors.cast?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      {/* <Form.Group controlId="formWriter">
        <Form.Label>Writers</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g. Christopher Nolan, Jonathan Nolan"
          {...register("Writer", {
            required: "Writer name is required",
            validate: (value) => {
              const writerList = value
                .split(",")
                .map((writer) => writer.trim())
                .filter(Boolean);
              return (
                writerList.length >= 1 || "At least one writer is required"
              );
            },
          })}
          isInvalid={!!errors.Writer}
        />
        <Form.Control.Feedback type="invalid">
          {errors.Writer?.message}
        </Form.Control.Feedback>
      </Form.Group> */}
    </>
  );
}
