import React, { useEffect, useState } from "react";
import { notesApi } from "../api/notesApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// ...

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const loadNotes = async () => {
        const res = await notesApi.getMyNotes();
        setNotes(res.data);
    };

    useEffect(() => {
        loadNotes();
    }, []);

    const handleDelete = async (id) => {
        await notesApi.deleteNote(id);
        setNotes((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <div className="app-container">
            <div className="card card-wide">
                <div className="header-row">
                    <h1>My Notes</h1>
                    <div>
                        <button
                            style={{ marginRight: "8px" }}
                            onClick={() => navigate("/notes/new")}
                        >
                            New Note
                        </button>
                        <button className="secondary" onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>

                <div className="notes-list">
                    {notes.map((n) => (
                        <div key={n.id} className="note-item">
                            <h3>{n.title}</h3>
                            <p>{n.content}</p>
                            <button
                                className="secondary"
                                onClick={() => navigate(`/notes/${n.id}/edit`, { state: { note: n } })}
                            >
                                Edit
                            </button>
                            <button
                                className="danger"
                                style={{ marginLeft: "8px" }}
                                onClick={() => handleDelete(n.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotesPage;