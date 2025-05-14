import { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";

export default function Cast({
  control,
  errors,
  watch,
  setValue,
  initialCast,
  register,
}) {
  const rawCast = watch("cast");
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      if (Array.isArray(initialCast) && initialCast.length > 0) {
        setValue("cast", initialCast);
      } else {
        setValue("cast", [""]);
      }
      hasInitialized.current = true;
    }
  }, [initialCast, setValue]);

  const castList = Array.isArray(rawCast) && rawCast.length > 0 ? rawCast : [""];

  const handleAddInput = () => {
    setValue("cast", [...castList, ""]);
  };

  const handleRemoveInput = (index) => {
    const updatedList = castList.filter((_, i) => i !== index);
    setValue("cast", updatedList.length ? updatedList : [""]);
  };

  return (
    <Form.Group className="col-md-12 justify-content-center">
      <Form.Label>Cast</Form.Label>
      <div className="d-flex flex-wrap" style={{ gap: "8px" }}>
        {castList.map((_, index) => (
          <div
            key={`cast-${index}`}
            className="mb-2 d-flex align-items-center"
            style={{ gap: "8px", width: "calc(33% - 4px)" }}
          >
            <div style={{ position: "relative", flex: 1 }}>
              <Controller
                control={control}
                name={`cast.${index}`}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    id={`cast-${index}`}
                    type="text"
                    placeholder={`Actor ${index + 1}`}
                    style={{ paddingRight: "2.5rem", height: "40px" }}
                  />
                )}
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
          </div>
        ))}
      </div>

      {/* hidden input for validation */}
      <input
        type="hidden"
        {...register("cast", {
          validate: (value) => {
            const filled = value.filter((name) => name.trim() !== "");
            return (
              filled.length >= 3 || "At least three cast names are required"
            );
          },
        })}
      />
      {errors.cast && <div className="text-danger">{errors.cast.message}</div>}
    </Form.Group>
  );
}
