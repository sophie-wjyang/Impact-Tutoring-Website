import React from 'react'
import Form from 'react-bootstrap/Form';

export default function TextBox(props) {
  const { id="", controlId, label, placeholder, value, onChange, autocomplete } = props;

  return (
    <Form.Group className="mb-3" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Control id={id} type="text" className="input-text" placeholder={placeholder} value={value} onChange={onChange} autocomplete={autocomplete}/>
    </Form.Group>
  )
}
