import React from 'react'
import Form from 'react-bootstrap/Form';

export default function RadioButtons(props) {
  const { controlId, label, label1, label2, id1, id2, radioGroup, onChange, required } = props;
  
  return (
    <Form.Group className="mb-3" controlId={controlId} required={required}>
        <Form.Label>{label}</Form.Label>
        <div>
            <Form.Check
                type="radio"
                label={label1}
                id={id1}
                name={radioGroup}
                inline
                value={label1}
                onChange={onChange}
            />
            <Form.Check
                type="radio"
                label={label2}
                id={id2}
                name={radioGroup}
                inline
                value={label2}
                onChange={onChange}
            />
        </div>
    </Form.Group>
  )
}
