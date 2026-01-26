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
        note.setUpdatedAt(LocalDateTime.now());
        return noteRepository.save(note);

    }




}

