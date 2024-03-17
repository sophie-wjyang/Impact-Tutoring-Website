import React from 'react'
import Form from 'react-bootstrap/Form';

export default function Dropdown(props) {
  const { controlId, label, placeholder, value, options, onChange } = props;

  return (
    <Form.Group className="mb-3" controlId={controlId}>
        <Form.Label>{label}</Form.Label>

        <Form.Select value={value} onChange={onChange} className={value === "" ? "dropdown-placeholder" : "dropdown-option"}>
            <option value="" className="dropdown-placeholder" disabled hidden >{placeholder}</option>
            {options.map((option, index) => (
                <option key={index} className="dropdown-option">{option}</option>
            ))}
        </Form.Select>
    </Form.Group>
  )
}
