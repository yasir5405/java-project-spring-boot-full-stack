package com.example.feedback.dao;

import com.example.feedback.model.Feedback;
import java.util.List;

public interface FeedbackDao {
    int submitFeedback(Feedback feedback);
    Feedback getFeedbackById(int id);
    List<Feedback> getAllFeedback();
    int updateFeedback(Feedback feedback);
    int deleteFeedback(int id);
    List<Feedback> getFeedbackByUserId(int userId);
}
