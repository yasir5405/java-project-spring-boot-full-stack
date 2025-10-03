package com.example.feedback.model;

import java.sql.Timestamp;

public class Feedback {
    private int id;
    private int userId;
    private String message;
    private Timestamp createdAt;
    private int upvoteCount;
    private int downvoteCount;

    public Feedback() {}
    public Feedback(int id, int userId, String message, Timestamp createdAt) {
        this.id = id;
        this.userId = userId;
        this.message = message;
        this.createdAt = createdAt;
        this.upvoteCount = 0;
        this.downvoteCount = 0;
    }

    public Feedback(int id, int userId, String message, Timestamp createdAt, int upvoteCount, int downvoteCount) {
        this.id = id;
        this.userId = userId;
        this.message = message;
        this.createdAt = createdAt;
        this.upvoteCount = upvoteCount;
        this.downvoteCount = downvoteCount;
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
    public int getUpvoteCount() { return upvoteCount; }
    public void setUpvoteCount(int upvoteCount) { this.upvoteCount = upvoteCount; }
    public int getDownvoteCount() { return downvoteCount; }
    public void setDownvoteCount(int downvoteCount) { this.downvoteCount = downvoteCount; }

    // Utility method to get net votes
    public int getNetVotes() {
        return upvoteCount - downvoteCount;
    }
}
