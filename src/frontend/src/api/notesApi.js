import axiosClient from "./axiosClient";

export const notesApi = {
    getMyNotes: () => axiosClient.get("/notes/allNotes"),
    createNote: (data) => axiosClient.post("/notes/create", data),
    updateNote: (id, data) => axiosClient.post(`/notes/update/${id}`, data),
    deleteNote: (id) => axiosClient.delete(`/notes/delete/${id}`),
};


