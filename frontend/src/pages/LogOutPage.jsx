import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import client from "../axios";

export default function LogOut() {
  const navigate = useNavigate();

  useEffect(() => {
    client
      .get("log-out")
      .then(() => navigate("/log-in"))
      .catch(() => navigate("/log-in"));
  }, [navigate]);

  return null;
}
