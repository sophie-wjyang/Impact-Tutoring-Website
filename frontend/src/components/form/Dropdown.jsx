import React from "react";
import Form from "react-bootstrap/Form";

export default function Dropdown(props) {
    const { controlId, label, placeholder, value, options, onChange, description } = props;

    return (
        <Form.Group className="mb-3" controlId={controlId}>
            {/* dropdown label */}
            <Form.Label>{label}</Form.Label>

            {/* optional description */}
            {description !== "" && <p className="input-description">{description}</p>}

            {/* dropdown options */}
            {/* initially pass in an empty value, value only changes when an option is selected and the component is re-rendered, then the class changes */}
            <Form.Select value={value} onChange={onChange} className={(value === "") ? "dropdown-placeholder" : "dropdown-option"}>
                <option value="" className="dropdown-placeholder" disabled hidden>
                    {placeholder}
                </option>
                {options.map((option, index) => (
                    <option key={index} className="dropdown-option">
                        {option}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
    );
}
