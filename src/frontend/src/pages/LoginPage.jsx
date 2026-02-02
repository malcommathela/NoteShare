// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import "../css/login.css"

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
                <div className="login-header">
                    <div className="logo">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <rect width="32" height="32" rx="6" fill="#635BFF"/>
                            <path d="M8 12h16v2H8v-2zm0 4h16v2H8v-2zm0 4h10v2H8v-2z" fill="white"/>
                        </svg>
                    </div>
                    <h1>Sign in to Dashboard</h1>
                    <p>Welcome back! Please sign in to continue</p>
                </div>

                {message && <p className="error">{message}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                    /><br/>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    /><br/>
                    <div className="form-options">
                        <label className="checkbox-container">
                            <input type="checkbox" id="remember" name="remember"/>
                            <span className="checkmark">
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4l2.5 2.5L9 1" stroke="currentColor" strokeWidth="1.5"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                            Remember me
                        </label>
                        <a href="#" className="forgot-link">Forgot password?</a>
                    </div>
                    <button type="submit" className="submit-btn" >Login</button>
                </form>
                <div className="divider">
                    <span>or continue with</span>
                </div>

                <div className="social-buttons">
                    <button type="button" className="social-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16">
                            <path fill="#4285F4"
                                  d="M14.9 8.161c0-.476-.039-.954-.118-1.421H8.021v2.681h3.833a3.321 3.321 0 01-1.431 2.161v1.785h2.3c1.349-1.25 2.177-3.103 2.177-5.206z"/>
                            <path fill="#34A853"
                                  d="M8.021 15c1.951 0 3.57-.65 4.761-1.754l-2.3-1.785c-.653.447-1.477.707-2.461.707-1.887 0-3.487-1.274-4.057-2.991H1.617V11.1C2.8 13.481 5.282 15 8.021 15z"/>
                            <path fill="#FBBC05"
                                  d="M3.964 9.177a4.97 4.97 0 010-2.354V4.9H1.617a8.284 8.284 0 000 7.623l2.347-1.346z"/>
                            <path fill="#EA4335"
                                  d="M8.021 3.177c1.064 0 2.02.375 2.75 1.111l2.041-2.041C11.616 1.016 9.97.446 8.021.446c-2.739 0-5.221 1.519-6.404 3.9l2.347 1.346c.57-1.717 2.17-2.515 4.057-2.515z"/>
                        </svg>
                        Google
                    </button>

                    <button type="button" className="social-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="#000000">
                            <path
                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                        GitHub
                    </button>
                </div>

                <p style={{marginTop: "12px"}}>
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
