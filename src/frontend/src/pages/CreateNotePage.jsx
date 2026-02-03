import React, { useState } from "react";
import { notesApi } from "../api/notesApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CreateNotePage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleCreate = async (e) => {
        e.preventDefault();
        await notesApi.createNote({ title, content });
        // after successful creation, go back to list page
        navigate("/notes");
    };

    return (
        <div className="app-container">
            <div className="card card-wide">
                <div className="header-row">
                    <h1>New Note</h1>
                </div>

                <form onSubmit={handleCreate}>
                    <input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    /><br />
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    /><br />
                    <button type="submit">Create</button>
                    <button
                        type="button"
                        className="secondary"
                        style={{ marginLeft: "8px" }}
                        onClick={() => navigate("/notes")}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateNotePage;
