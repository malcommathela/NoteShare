import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { notesApi } from "../api/notesApi";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";


const NoteFormPage = ({ mode }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const location = useLocation();
    const { id } = useParams();
    const { logout } = useAuth();
    const [attachmentUrl, setAttachmentUrl] = useState(null);


    // If editing, try to get note from router state; otherwise optionally fetch by id
    useEffect(() => {
        if (mode === "edit") {
            const fromState = location.state?.note;

            if (fromState) {
                setTitle(fromState.title);
                setContent(fromState.content);
                setAttachmentUrl(fromState.attachmentUrl || null);
            } else {
                (async () => {
                    const res = await notesApi.getNote(id);
                    setTitle(res.data.title);
                    setContent(res.data.content);
                    setAttachmentUrl(res.data.attachmentUrl || null);
                })();
            }
        }
    }, [mode, id, location.state]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        let finalAttachmentUrl = attachmentUrl;

        if (file) {
            const fileName = `${Date.now()}-${file.name}`;

            const { error } = await supabase.storage
                .from("note-attachments")
                .upload(fileName, file, { upsert: true });

            if (error) {
                alert("File upload failed");
                console.error(error);
                return;
            }

            const { data } = supabase.storage
                .from("note-attachments")
                .getPublicUrl(fileName);

            finalAttachmentUrl = data.publicUrl;
        }

        if (mode === "create") {
            await notesApi.createNote({
                title,
                content,
                attachmentUrl: finalAttachmentUrl
            });
        } else {
            await notesApi.updateNote(id, {
                title,
                content,
                attachmentUrl: finalAttachmentUrl
            });
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
                    <label style={{ fontSize: "14px", marginBottom: "6px", display: "block" }}>
                        Attachment
                    </label>

                    {attachmentUrl && (
                        <div style={{ marginBottom: "10px" }}>
                            {attachmentUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                <img
                                    src={attachmentUrl}
                                    alt="attachment"
                                    style={{ maxWidth: "160px", borderRadius: "8px" }}
                                />
                            ) : (
                                <a href={attachmentUrl} target="_blank" rel="noreferrer">
                                    View current attachment
                                </a>
                            )}

                            <div>
                                <button
                                    type="button"
                                    className="danger"
                                    onClick={() => {
                                        setAttachmentUrl(null);
                                        setFile(null);
                                    }}
                                >
                                    Remove attachment
                                </button>
                            </div>
                        </div>
                    )}


                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <br />

                    {file && (
                        <p style={{ fontSize: "13px" }}>
                            Selected: {file.name}
                        </p>
                    )}


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
