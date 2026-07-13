import axios from "axios";

export default axios.create({
    baseURL: "https://work2-59om.onrender.com",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});
