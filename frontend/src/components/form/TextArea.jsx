import React from "react";
import Form from "react-bootstrap/Form";

export default function TextArea(props) {
    const { controlId, label, placeholder, value, rows, onChange } = props;

    return (
        <Form.Group className="mb-3" controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control id={id} as="textarea" rows={rows} className="input-text" placeholder={placeholder} value={value} onChange={onChange} />
        </Form.Group>
    );
}
