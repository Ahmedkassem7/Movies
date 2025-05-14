import { useEffect } from "react";
import { Form } from "react-bootstrap";

export default function Cast({ register, errors, watch, setValue, initialCast }) {
  const rawCast = watch("cast");
  const castList = Array.isArray(rawCast) ? rawCast : (Array.isArray(initialCast) && initialCast.length > 0 ? initialCast : [""]);

  useEffect(() => {
    if (Array.isArray(initialCast) && initialCast.length > 0 && !Array.isArray(rawCast)) {
      setValue("cast", initialCast);
    } else if (!Array.isArray(rawCast)) {
      setValue("cast", [""]);
    }
  }, [initialCast, rawCast, setValue]);

  const handleChange = (index, value) => {
    const updatedList = [...castList];
    updatedList[index] = value;
    setValue("cast", updatedList);
  };

  const handleAddInput = () => {
    setValue("cast", [...castList, ""]);
  };

  const handleRemoveInput = (index) => {
    const updatedList = castList.filter((_, i) => i !== index);
    setValue("cast", updatedList.length ? updatedList : [""]);
  };

  return (
    <Form.Group controlId="formActors" className="col-md-12 justify-content-center">
      <Form.Label>Cast</Form.Label>
      <div className="d-flex flex-wrap" style={{ gap: "8px" }}>
        {castList.map((name, index) => (
          <div
            key={`${name}-${index}`}
            className="mb-2 d-flex align-items-center"
            style={{ gap: "8px", width: 'calc(33% - 4px)' }}  
          >
            <div style={{ position: "relative", flex: 1 }}>
              <Form.Control
                type="text"
                placeholder={`Actor ${index + 1}`}
                value={name}
                onChange={(e) => handleChange(index, e.target.value)}
                style={{
                  paddingRight: "2.5rem",
                  height: "40px",
                }}
              />
              <span
                onClick={() => handleRemoveInput(index)}
                title="Remove"
                style={{
                  position: "absolute",
                  top: "30%",
                  right: "15px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "red",
                  fontSize: "24px",
                  lineHeight: "1",
                }}
              >
                ×
              </span>
            </div>
            {index === castList.length - 1 && (
              <button
                type="button"
                className="btn btn-outline-light mb-3"
                onClick={handleAddInput}
                style={{ height: "40px", whiteSpace: "nowrap" }}
              >
                + Add Actor
              </button>
            )}
            {index !== castList.length - 1 && <div style={{ width: 'auto' }}></div>}
          </div>
        ))}
      </div>

      {/* hidden input for validation */}
      <input
        type="hidden"
        {...register("cast", {
          validate: (value) => {
            const filled = value.filter((name) => name.trim() !== "");
            return filled.length >= 3 || "At least three cast names are required";
          },
        })}
      />
      {errors.cast && <div className="text-danger">{errors.cast.message}</div>}
    </Form.Group>
  );
}