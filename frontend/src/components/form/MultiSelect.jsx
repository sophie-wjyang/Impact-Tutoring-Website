import React from 'react'
import Form from 'react-bootstrap/Form';

export default function MultiSelect(props) {
  const { controlId, label, value, options, onChange, description } = props;

  return (
    <Form.Group className="mb-3" controlId={controlId}>
        {/* dropdown label */}
        <Form.Label className="mb-0">{label}</Form.Label>

        {/* optional description */}
        {description !== "" && <p className="input-description">{description}</p>}

        {/* dropdown options */}
        <Form.Select onChange={onChange} className="dropdown-option" multiple>
            {options.map((option, index) => (
                <option key={index} className="dropdown-option">{option}</option>
            ))}
        </Form.Select>
    </Form.Group>
  )
}
