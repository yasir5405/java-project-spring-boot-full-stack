package com.example.feedback.service.impl;

import com.example.feedback.dao.VoteDao;
import com.example.feedback.model.Vote;
import com.example.feedback.model.Vote.VoteType;
import com.example.feedback.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VoteServiceImpl implements VoteService {

    @Autowired
    private VoteDao voteDao;

    @Override
    public String upvoteFeedback(int feedbackId, int userId) {
        return handleVote(feedbackId, userId, VoteType.UPVOTE);
    }

    @Override
    public String downvoteFeedback(int feedbackId, int userId) {
        return handleVote(feedbackId, userId, VoteType.DOWNVOTE);
    }

    @Override
    public String removeVote(int feedbackId, int userId) {
        Optional<Vote> existingVote = voteDao.getUserVoteForFeedback(feedbackId, userId);
        if (existingVote.isPresent()) {
            int result = voteDao.deleteVote(feedbackId, userId);
            return result > 0 ? "Vote removed successfully" : "Failed to remove vote";
        } else {
            return "No vote found to remove";
        }
    }

    @Override
    public Optional<Vote> getUserVoteForFeedback(int feedbackId, int userId) {
        return voteDao.getUserVoteForFeedback(feedbackId, userId);
    }

    private String handleVote(int feedbackId, int userId, VoteType newVoteType) {
        Optional<Vote> existingVote = voteDao.getUserVoteForFeedback(feedbackId, userId);
        
        if (existingVote.isPresent()) {
            Vote vote = existingVote.get();
            if (vote.getVoteType() == newVoteType) {
                // Same vote type - remove the vote
                int result = voteDao.deleteVote(feedbackId, userId);
                return result > 0 ? "Vote removed successfully" : "Failed to remove vote";
            } else {
                // Different vote type - update the vote
                vote.setVoteType(newVoteType);
                int result = voteDao.updateVote(vote);
                return result > 0 ? "Vote updated successfully" : "Failed to update vote";
            }
        } else {
            // No existing vote - create new vote
            Vote newVote = new Vote(feedbackId, userId, newVoteType);
            int result = voteDao.createVote(newVote);
            return result > 0 ? "Vote added successfully" : "Failed to add vote";
        }
    }
}