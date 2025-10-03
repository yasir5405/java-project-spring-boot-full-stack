package com.example.feedback.controller;

import com.example.feedback.model.User;
import com.example.feedback.model.Vote;
import com.example.feedback.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/votes")
public class VoteController {

    @Autowired
    private VoteService voteService;

    @PostMapping("/upvote/{feedbackId}")
    public ResponseEntity<String> upvoteFeedback(@PathVariable int feedbackId, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        String result = voteService.upvoteFeedback(feedbackId, user.getId());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/downvote/{feedbackId}")
    public ResponseEntity<String> downvoteFeedback(@PathVariable int feedbackId, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        String result = voteService.downvoteFeedback(feedbackId, user.getId());
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{feedbackId}")
    public ResponseEntity<String> removeVote(@PathVariable int feedbackId, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        String result = voteService.removeVote(feedbackId, user.getId());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{feedbackId}/user-vote")
    public ResponseEntity<Vote> getUserVote(@PathVariable int feedbackId, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Optional<Vote> vote = voteService.getUserVoteForFeedback(feedbackId, user.getId());
        return vote.map(ResponseEntity::ok).orElse(ResponseEntity.ok().build());
    }
}