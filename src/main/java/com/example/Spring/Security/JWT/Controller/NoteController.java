package com.example.Spring.Security.JWT.Controller;

import com.example.Spring.Security.JWT.DT0.CreateNoteRequest;
import com.example.Spring.Security.JWT.DT0.UpdateNoteRequest;
import com.example.Spring.Security.JWT.Service.NoteService;
import com.example.Spring.Security.JWT.model.Note;
import com.example.Spring.Security.JWT.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/notes")
@RestController
public class NoteController {

    private final NoteService noteService;

    @Autowired
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping("/create")
    public ResponseEntity<Note> createNote(@RequestBody CreateNoteRequest request,
                                           @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(noteService.createNote(request,user));
    }

    @GetMapping("/allNotes")
    public ResponseEntity<List<Note>> getAllNotes(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(noteService.getAllNotes(user));
    }

    @GetMapping("/getbyid/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(noteService.getMyNoteById(id,user));
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody UpdateNoteRequest request, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(noteService.updateNote(id, request,user));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long id, @AuthenticationPrincipal User user) {
        noteService.deleteNote(id, user);
        return ResponseEntity.noContent().build();
    }







}
