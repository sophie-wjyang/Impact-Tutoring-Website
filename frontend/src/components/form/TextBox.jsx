import React from "react";
import Form from "react-bootstrap/Form";

export default function TextBox(props) {
    const { controlId, label, placeholder, value, onChange, autocomplete, required, type = "text" } = props;

    return (
        <Form.Group className="mb-3" controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} className="input-text" placeholder={placeholder} value={value} onChange={onChange} autoComplete={autocomplete} required={required} />
        </Form.Group>
    );
}
