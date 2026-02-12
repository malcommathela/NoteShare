import React, { useState } from "react";
import { notesApi } from "../api/notesApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {supabase} from "../lib/supabase.js";
import "../css/Notes.css"

const CreateNotePage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleCreate = async (e) => {
        e.preventDefault();
        let attachmentUrl = null;

        if (file) {
            const fileName = `${Date.now()}-${file.name}`;

            const { error } = await supabase.storage
                .from("note-attachments")
                .upload(fileName, file);

            if (error) {
                alert("Upload failed");
                return;
            }

            const { data } = supabase.storage
                .from("note-attachments")
                .getPublicUrl(fileName);

            attachmentUrl = data.publicUrl;
        }
        await notesApi.createNote({
            title,
            content,
            attachmentUrl
        });

        // after successful creation, go back to list page
        navigate("/notes");
    };

    return (
        <div className="app-container">
            <div className="card card-wide">
                <h2 style={{color:"red"}}>DEBUG CREATE NOTE</h2>

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
                    <label style={{ fontSize: "14px", marginBottom: "6px", display: "block" }}>
                        Attachment
                    </label>

                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <br/>

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
