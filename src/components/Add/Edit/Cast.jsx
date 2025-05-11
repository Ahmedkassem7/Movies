import { Form } from "react-bootstrap";

export default function Cast({ register, errors }) {
  return (
    <>
      <Form.Group controlId="formDirector">
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
      </Form.Group>

      <Form.Group controlId="formActors">
        <Form.Label>Actors</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter at least 3 names, separated by commas"
          {...register("cast", {
            required: "Actors name is required",
            validate: (value) => {
              const actorList = value
                .split(",")
                .map((actor) => actor.trim())
                .filter(Boolean);
              return (
                actorList.length >= 2 || "At least two actors are required"
              );
            },
          })}
          isInvalid={!!errors.Actors}
        />
        <Form.Control.Feedback type="invalid">
          {errors.Actors?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formWriter">
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
      </Form.Group>
    </>
  );
}
