package com.example.Spring.Security.JWT.model;

import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends CrudRepository<Note, Long> {
    List<Note> findByOwner(User owner);
    Optional<Note> findByShareToken(String shareToken);
    Optional<Note> findByIdAndOwner(Long id, User owner);

}
