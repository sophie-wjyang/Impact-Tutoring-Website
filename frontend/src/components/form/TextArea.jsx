import React from "react";
import Form from "react-bootstrap/Form";

export default function TextArea(props) {
    const { controlId, label, description, placeholder, value, rows, onChange, required } = props;

    return (
        <Form.Group className="mb-3" controlId={controlId}>
            {/* label */}
            <Form.Label>{label}</Form.Label>

            {/* optional description */}
            {description !== "" && <p className="input-description">{description}</p>}

            {/* text area */}
            <Form.Control as="textarea" rows={rows} className="input-text" placeholder={placeholder} value={value} onChange={onChange} required={required} />
        </Form.Group>
    );
}
