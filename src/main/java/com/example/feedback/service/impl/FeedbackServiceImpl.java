package com.example.feedback.service.impl;

import com.example.feedback.dao.FeedbackDao;
import com.example.feedback.model.Feedback;
import com.example.feedback.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {
    @Autowired
    private FeedbackDao feedbackDao;

    @Override
    public int submitFeedback(Feedback feedback) {
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
