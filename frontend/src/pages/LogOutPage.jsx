import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// bootstrap
import { Container, Row, Col, Table, Image } from "react-bootstrap";

export default function LogOut(props) {
    const {resetActiveKey, activeKey} = props;
    const navigate = useNavigate();

    // get all relevant profile information on component render
    useEffect(() => {
        axios.get("http://localhost:5000/log-out", { withCredentials: true }).then((res) => {
            if (res.data.message === "success") {
                resetActiveKey();
                console.log("Logout suceeded")
                navigate("/login");
            } else {
                console.log("Logout failed");
            }
        });
    }, []);

    return <></>;
}
