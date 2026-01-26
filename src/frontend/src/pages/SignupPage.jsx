import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage]   = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            await authApi.signup({ username, email, password });
            setMessage("Signup successful. Check your email for verification code.");
            navigate("/verify");
        } catch (err) {
            setMessage(err?.response?.data || "Signup failed");
        }
    };

    return (
        <div className="app-container">
            <div className="card">
                <h1>Signup</h1>
                {message && <p className="success">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    /><br />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /><br />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br />
                    <button type="submit">Signup</button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
