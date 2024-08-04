import React from "react";
import Form from "react-bootstrap/Form";

export default function RadioButtons(props) {
  const { controlId, label, options, radioGroup, onChange, required } = props;

  return (
    <Form.Group className="mb-3" controlId={controlId} required={required}>
      <Form.Label>{label}</Form.Label>
      <div>
        {options.map(({ label, id, value }) => (
          <Form.Check
            type="radio"
            label={label}
            id={id}
            name={radioGroup}
            inline
            value={value ?? label}
            onChange={onChange}
          />
        ))}
      </div>
    </Form.Group>
  );
}
