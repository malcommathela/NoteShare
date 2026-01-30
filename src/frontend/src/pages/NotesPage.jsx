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
        try {
            const res = await notesApi.getMyNotes();

            if (Array.isArray(res.data)) {
                setNotes(res.data);
            } else if (Array.isArray(res.data?.notes)) {
                setNotes(res.data.notes);
            } else {
                setNotes([]);
            }

        } catch (err) {
            if (err?.response?.status === 401 || err?.response?.status === 403) {
                logout();
                return;
            }
            console.error(err);
            setNotes([]);
        }
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
                    {Array.isArray(notes) && notes.map((n) => (
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