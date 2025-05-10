import React from "react";
import { FormCheck } from "react-bootstrap";

export default function FilterOption({ label, checked, onChange }) {
  return (
    <FormCheck
      type="checkbox"
      id={`check-${label}`}
      label={label}
      checked={checked}
      onChange={onChange}
      className="text-white"
    />
  );
}
