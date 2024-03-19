import React from "react";
import Form from "react-bootstrap/Form";

export default function FileUpload(props) {
    const { controlId, label, description } = props;

    return (
        <Form.Group className="mb-3" controlId={controlId}>
            {/* dropdown label */}
            <Form.Label>{label}</Form.Label>

            {/* optional description */}
            {description !== "" && <p className="input-description">{description}</p>}

            {/* file upload button */}
            <Form.Control type="file" className="file-upload-box"/>
        </Form.Group>
    );
}
