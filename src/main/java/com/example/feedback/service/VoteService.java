package com.example.feedback.service;

import com.example.feedback.model.Vote;
import java.util.Optional;

public interface VoteService {
    String upvoteFeedback(int feedbackId, int userId);
    String downvoteFeedback(int feedbackId, int userId);
    String removeVote(int feedbackId, int userId);
    Optional<Vote> getUserVoteForFeedback(int feedbackId, int userId);
}