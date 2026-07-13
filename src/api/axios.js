import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:6006",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});