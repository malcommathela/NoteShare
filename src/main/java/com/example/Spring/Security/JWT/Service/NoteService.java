package com.example.Spring.Security.JWT.Service;

import com.example.Spring.Security.JWT.DT0.CreateNoteRequest;
import com.example.Spring.Security.JWT.DT0.UpdateNoteRequest;
import com.example.Spring.Security.JWT.model.Note;
import com.example.Spring.Security.JWT.model.NoteRepository;
import com.example.Spring.Security.JWT.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;



@Service
public class NoteService {

    private final NoteRepository noteRepository;

    @Autowired
    public NoteService(NoteRepository noteRepository, UserDetailsService userDetailsService) {
        this.noteRepository = noteRepository;
    }

    public Note createNote(CreateNoteRequest createNoteRequest, User owner) {
        Note note = new Note();
        note.setTitle(createNoteRequest.getTitle());
        note.setContent(createNoteRequest.getContent());
        note.setAttachmentUrl(createNoteRequest.getAttachmentUrl());
        note.setOwner(owner);
        note.setCreatedAt(LocalDateTime.now());
        note.setUpdatedAt(LocalDateTime.now());
        return noteRepository.save(note);

    }

    public List<Note> getAllNotes(User owner) {
        return noteRepository.findByOwner(owner);
    }

    public Note getMyNoteById(long id, User owner) {
        return noteRepository.findByIdAndOwner(id,owner)
                .orElseThrow(()-> new RuntimeException("Note not found"));
    }

    public void deleteNote(long id, User owner) {
        Note note = getMyNoteById(id, owner);
        noteRepository.delete(note);
    }

    public Note updateNote(Long id, UpdateNoteRequest request, User owner) {
        Note note = getMyNoteById(id, owner);
        note.setTitle(request.getTitle());
        note.setContent(request.getContent());
        note.setAttachmentUrl(request.getAttachmentUrl());
        note.setUpdatedAt(LocalDateTime.now());
        return noteRepository.save(note);

    }


    public Note disableSharing(Long noteId, User owner) {

        Note note = getMyNoteById(noteId, owner);
        note.setShareToken(null);

        return noteRepository.save(note);
    }

    public Note getSharedNote(String token) {

        return noteRepository.findByShareToken(token)
                .orElseThrow(() -> new RuntimeException("Shared note not found"));
    }

    public String createShareToken(Long noteId, User owner) {

        Note note = getMyNoteById(noteId, owner);

        note.setPublic(true);

        if (note.getShareToken() == null || note.getShareToken().isBlank()) {
            note.setShareToken(UUID.randomUUID().toString());
        }

        noteRepository.save(note);

        return note.getShareToken();
    }









}

