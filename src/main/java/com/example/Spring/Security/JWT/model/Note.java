package com.example.Spring.Security.JWT.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "notes")
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "owner_id")
    private User owner;
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isPublic;
    @Column(name = "attachment_url")
    private String attachmentUrl;
    @Column(unique = true)
    private String shareToken;



    public Note(User owner, String title, String content, LocalDateTime createdAt, LocalDateTime updatedAt, boolean isPublic) {
        this.owner = owner;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isPublic = isPublic;
    }

    public Note() {

    }

    public String getShareToken() {
        return shareToken;
    }

    public void setShareToken(String shareToken) {
        this.shareToken = shareToken;
    }




}
