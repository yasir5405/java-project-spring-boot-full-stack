package com.example.feedback.dao;

import com.example.feedback.model.Vote;
import java.util.Optional;

public interface VoteDao {
    int createVote(Vote vote);
    int updateVote(Vote vote);
    int deleteVote(int feedbackId, int userId);
    Optional<Vote> getUserVoteForFeedback(int feedbackId, int userId);
    int getUpvoteCount(int feedbackId);
    int getDownvoteCount(int feedbackId);
    void updateFeedbackVoteCounts(int feedbackId);
}