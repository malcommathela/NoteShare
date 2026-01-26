// App.jsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
import NoteFormPage from "./pages/NoteFormPage";
import SignupPage from "./pages/SignupPage.jsx";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/notes/new" element={<NoteFormPage mode="create" />} />
            <Route path="/notes/:id/edit" element={<NoteFormPage mode="edit" />} />
            <Route path="*" element={<LoginPage />} />
        </Routes>
    );
}

export default App;
