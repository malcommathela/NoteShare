import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";

const VerifyPage = () => {
    const [email, setEmail]     = useState("");
    const [code, setCode]       = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            await authApi.verify({ email, verificationCode: code });
            setMessage("Verification successful. Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (err) {
            setMessage(err?.response?.data || "Verification failed");
        }
    };

    return (
        <div className="app-container">
            <div className="card">
                <h1>Verify Account</h1>
                {message && <p className="success">{message}</p>}
                <form onSubmit={handleVerify}>
                    <input
                        type="email"
                        placeholder="Email used for signup"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /><br />
                    <input
                        placeholder="Verification code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    /><br />
                    <button type="submit">Verify</button>
                </form>
            </div>
        </div>
    );
};

export default VerifyPage;
