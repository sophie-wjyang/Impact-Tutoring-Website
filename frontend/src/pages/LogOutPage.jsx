import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import client from "../axios";
import { useUser } from "../hooks/useUser";

export default function LogOut() {
    const navigate = useNavigate();
    const { setUser } = useUser();

    function logout() {
        setUser(null);
        navigate("/log-in");
    }

    useEffect(() => {
        client.get("log-out").then(logout).catch(logout);
    }, [navigate]);

    return null;
}
