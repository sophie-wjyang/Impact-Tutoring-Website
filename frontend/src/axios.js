import axios from "axios";

const client = axios.create({
    baseURL: "https://api.impact-tutoring.ca/",
    withCredentials: true,
});

export default client;
