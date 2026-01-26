import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { notesApi } from "../api/notesApi";
import { useAuth } from "../context/AuthContext";

const NoteFormPage = ({ mode }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const { logout } = useAuth();

    // If editing, try to get note from router state; otherwise optionally fetch by id
    useEffect(() => {
        if (mode === "edit") {
            const fromState = location.state?.note;
            if (fromState) {
                setTitle(fromState.title);
                setContent(fromState.content);
            } else {
                // fallback: fetch the note by id from backend
                (async () => {
                    const res = await notesApi.getNote(id);
                    setTitle(res.data.title);
                    setContent(res.data.content);
                })();
            }
        }
    }, [mode, id, location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (mode === "create") {
            await notesApi.createNote({ title, content });
        } else {
            await notesApi.updateNote(id, { title, content });
        }

        navigate("/notes");
    };

    const heading = mode === "create" ? "New Note" : "Edit Note";
    const buttonText = mode === "create" ? "Create" : "Update";

    return (
        <div className="app-container">
            <div className="card card-wide">
                <div className="header-row">
                    <h1>{heading}</h1>
                    <button className="secondary" onClick={logout}>
                        Logout
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
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
                    <button type="submit">{buttonText}</button>
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

export default NoteFormPage;
