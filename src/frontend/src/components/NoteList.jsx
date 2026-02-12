import React, { useEffect, useState } from "react";
import { notesApi } from "../api/notesApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/Notes.css"


const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [shareLink, setShareLink] = useState("");
    const [showShareModal, setShowShareModal] = useState(false);


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

    const getFileTypeIcon = (url) => {
        if (!url) return "📎";

        const ext = url.split(".").pop().toLowerCase();

        if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) return "🖼️";
        if (ext === "pdf") return "📄";
        if (["doc", "docx"].includes(ext)) return "📝";
        if (["xls", "xlsx"].includes(ext)) return "📊";
        if (["zip", "rar", "7z"].includes(ext)) return "🗜️";

        return "📎";
    };



    useEffect(() => {
        (async () => {
            await loadNotes();
        })();
    }, []);

    const handleDelete = async (id) => {
        await notesApi.deleteNote(id);
        setNotes((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <>

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
                        </div>
                    </div>

                    <div className="notes-list">
                        {Array.isArray(notes) &&
                            notes.map((n) => (
                                <div key={n.id} className="note-item">
                                    <h3>{n.title}</h3>
                                    <p>{n.content}</p>
                                    {n.attachmentUrl && (
                                        <a
                                            href={n.attachmentUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="attachment-file"
                                            title="Open attachment"
                                        >
                                        <span className="attachment-icon">
                                                {getFileTypeIcon(n.attachmentUrl)}
                                        </span>
                                            {/*<span className="attachment-text">Attachment</span>*/}
                                        </a>
                                    )}<br/>
                                    <div className="note-actions">
                                        <button
                                            className="secondary"
                                            onClick={() =>
                                                navigate(`/notes/${n.id}/edit`, { state: { note: n } })
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={async () => {
                                                const res = await notesApi.shareNote(n.id);

                                                const token = res.data;   // IMPORTANT: backend returns plain string
                                                const url = `${window.location.origin}/share/${token}`;

                                                setShareLink(url);
                                                setShowShareModal(true);
                                            }}
                                        >
                                            Share
                                        </button>



                                        <button
                                            className="danger"
                                            style={{ marginLeft: "8px" }}
                                            onClick={() => handleDelete(n.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>

                                </div>
                            ))}
                    </div>
                </div>
                {showShareModal && (
                    <div className="share-overlay">
                        <div className="share-modal">
                            <div className="share-header">
                                <h3>Share</h3>
                                <button
                                    className="close-btn"
                                    onClick={() => setShowShareModal(false)}
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="share-body">
                                <input
                                    type="text"
                                    value={shareLink}
                                    readOnly
                                />

                                <button
                                    onClick={async () => {
                                        await navigator.clipboard.writeText(shareLink);
                                    }}
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    );


};

export default NotesList;