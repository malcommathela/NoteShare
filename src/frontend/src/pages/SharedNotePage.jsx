import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function SharedNotePage() {

    const { token } = useParams();
    const [note, setNote] = useState(null);

    useEffect(() => {

        if (!token) return;

        axios.get(`${API}/notes/shared/${token}`)
            .then(res => setNote(res.data))
            .catch(() => alert("Invalid or expired link"));

    }, [token]);

    if (!note) return <p>Loading...</p>;

    return (
        <div className="app-container">
            <div className="card card-wide">
                <h1>{note.title}</h1>
                <p>{note.content}</p>

                {note.attachmentUrl && (
                    <a
                        href={note.attachmentUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        View attachment
                    </a>
                )}
            </div>
        </div>
    );
}
