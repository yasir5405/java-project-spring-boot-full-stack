package com.example.feedback.model;

import java.time.LocalDateTime;

public class Vote {
    private int id;
    private int feedbackId;
    private int userId;
    private VoteType voteType;
    private LocalDateTime createdAt;

    public enum VoteType {
        UPVOTE, DOWNVOTE
    }

    // Default constructor
    public Vote() {}

    // Constructor with parameters
    public Vote(int feedbackId, int userId, VoteType voteType) {
        this.feedbackId = feedbackId;
        this.userId = userId;
        this.voteType = voteType;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(int feedbackId) {
        this.feedbackId = feedbackId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public VoteType getVoteType() {
        return voteType;
    }

    public void setVoteType(VoteType voteType) {
        this.voteType = voteType;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Vote{" +
                "id=" + id +
                ", feedbackId=" + feedbackId +
                ", userId=" + userId +
                ", voteType=" + voteType +
                ", createdAt=" + createdAt +
                '}';
    }
}