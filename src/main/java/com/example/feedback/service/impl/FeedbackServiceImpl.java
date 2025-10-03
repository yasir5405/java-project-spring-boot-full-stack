package com.example.feedback.service.impl;

import com.example.feedback.dao.FeedbackDao;
import com.example.feedback.model.Feedback;
import com.example.feedback.service.ContentModerationService;
import com.example.feedback.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {
    @Autowired
    private FeedbackDao feedbackDao;
    
    @Autowired
    private ContentModerationService contentModerationService;

    @Override
    public int submitFeedback(Feedback feedback) {
        // Validate content before submission
        contentModerationService.validateContent(feedback.getMessage(), "create feedback");
        return feedbackDao.submitFeedback(feedback);
    }

    @Override
    public Feedback getFeedbackById(int id) {
        return feedbackDao.getFeedbackById(id);
    }

    @Override
    public List<Feedback> getAllFeedback() {
        return feedbackDao.getAllFeedback();
    }

    @Override
    public int updateFeedback(Feedback feedback) {
        // Validate content before update
        contentModerationService.validateContent(feedback.getMessage(), "update feedback");
        return feedbackDao.updateFeedback(feedback);
    }

    @Override
    public int deleteFeedback(int id) {
        return feedbackDao.deleteFeedback(id);
    }

    @Override
    public List<Feedback> getFeedbackByUserId(int userId) {
        return feedbackDao.getFeedbackByUserId(userId);
    }
}
