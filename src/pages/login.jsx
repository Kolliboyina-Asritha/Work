import "./login.css";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";
function Login() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        // Prevent multiple clicks
        if (loading) return;

        setLoading(true);

        try {
        
        const response = await axios.post(
            "/auth",
            {
                email,
                password
            },
            {
                withCredentials: true
            }
        );

        const accessToken = response.data.accessToken;

        const decoded = jwtDecode(accessToken);

        console.log(decoded);

            setAuth({

            accessToken,

            id: decoded.UserInfo.id,

            email: decoded.UserInfo.email,

            roles: decoded.UserInfo.roles

        });
        console.log("Auth stored successfully");
          console.log(response.data);
        navigate("/dashboard");

        

            // We'll store the access token and navigate
            // to the dashboard in the next step.

        } catch (err) {

            console.log(err.response?.data || err.message);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <h4 className="logo">EMPLOYEE MANAGEMENT</h4>

                <h2 className="wel">Welcome Back</h2>

                <p>Sign in to continue to your workspace</p>

                <form onSubmit={handleLogin}>

                    <div className="input-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                    </div>

                    <div className="input-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

            </div>

        </div>

    );
}

export default Login;