package com.example.feedback.controller;

import com.example.feedback.model.Feedback;
import com.example.feedback.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Feedback>> getFeedbackByUserId(@PathVariable int userId) {
        List<Feedback> feedbacks = feedbackService.getFeedbackByUserId(userId);
        return ResponseEntity.ok(feedbacks);
    }

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<String> submitFeedback(@RequestBody Feedback feedback,
            org.springframework.security.core.Authentication authentication) {
        com.example.feedback.model.User user = (com.example.feedback.model.User) authentication.getPrincipal();
        feedback.setUserId(user.getId());
        int result = feedbackService.submitFeedback(feedback);
        return ResponseEntity.ok(result > 0 ? "Feedback submitted successfully!" : "Failed to submit feedback");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getFeedback(@PathVariable int id) {
        Feedback feedback = feedbackService.getFeedbackById(id);
        return feedback != null ? ResponseEntity.ok(feedback) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public List<Feedback> getAllFeedback() {
        return feedbackService.getAllFeedback();
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateFeedback(@PathVariable int id, @RequestBody Feedback feedback) {
        feedback.setId(id);
        int result = feedbackService.updateFeedback(feedback);
        return ResponseEntity.ok(result > 0 ? "Feedback updated successfully" : "Failed to update feedback");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFeedback(@PathVariable int id) {
        int result = feedbackService.deleteFeedback(id);
        return ResponseEntity.ok(result > 0 ? "Feedback deleted successfully" : "Failed to delete feedback");
    }
}
