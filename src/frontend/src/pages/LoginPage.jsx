// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!email || !password) {
            setMessage("Email and password are required");
            return;
        }

        try {
            const res = await authApi.login({ email, password });
            // adjust property if your backend returns token differently
            login(res.data.token);
            navigate("/notes");
        } catch (err) {
            console.log(err.response);
            setMessage(JSON.stringify(err.response?.data));
        }
    };

    const goToSignup = () => {
        navigate("/signup");
    };

    return (
        <div className="app-container">
            <div className="card">
                <h1>Login</h1>

                {message && <p className="error">{message}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                    /><br />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    /><br />
                    <button type="submit">Login</button>
                </form>

                <p style={{ marginTop: "12px" }}>
                    Don&apos;t have an account?{" "}
                    <button
                        type="button"
                        className="link-button"
                        onClick={goToSignup}
                    >
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
