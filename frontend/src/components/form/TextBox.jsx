import React from 'react'

import Form from 'react-bootstrap/Form';

export default function TextBox(props) {
  const { controlId, label, placeholder, value, onChange } = props;

  return (
    <Form.Group className="mb-3" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Control type="text" placeholder={placeholder} value={value} onChange={onChange}/>
    </Form.Group>
  )
}
