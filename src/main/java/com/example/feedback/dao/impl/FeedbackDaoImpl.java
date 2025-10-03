package com.example.feedback.dao.impl;

import com.example.feedback.dao.FeedbackDao;
import com.example.feedback.model.Feedback;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

@Repository
public class FeedbackDaoImpl implements FeedbackDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private RowMapper<Feedback> feedbackRowMapper = new RowMapper<Feedback>() {
        public Feedback mapRow(ResultSet rs, int rowNum) throws SQLException {
            Feedback feedback = new Feedback();
            feedback.setId(rs.getInt("id"));
            feedback.setUserId(rs.getInt("user_id"));
            feedback.setMessage(rs.getString("message"));
            feedback.setCreatedAt(rs.getTimestamp("created_at"));
            feedback.setUpvoteCount(rs.getInt("upvote_count"));
            feedback.setDownvoteCount(rs.getInt("downvote_count"));
            return feedback;
        }
    };

    @Override
    public int submitFeedback(Feedback feedback) {
    String sql = "INSERT INTO feedback (user_id, message) VALUES (?, ?)";
    return jdbcTemplate.update(sql, feedback.getUserId(), feedback.getMessage());
    }

    @Override
    public Feedback getFeedbackById(int id) {
        String sql = "SELECT * FROM feedback WHERE id = ?";
        List<Feedback> feedbacks = jdbcTemplate.query(sql, feedbackRowMapper, id);
        return feedbacks.isEmpty() ? null : feedbacks.get(0);
    }

    @Override
    public List<Feedback> getAllFeedback() {
        String sql = "SELECT * FROM feedback ORDER BY (upvote_count - downvote_count) DESC, created_at DESC";
        return jdbcTemplate.query(sql, feedbackRowMapper);
    }

    @Override
    public int updateFeedback(Feedback feedback) {
        String sql = "UPDATE feedback SET message = ? WHERE id = ?";
        return jdbcTemplate.update(sql, feedback.getMessage(), feedback.getId());
    }

    @Override
    public int deleteFeedback(int id) {
        String sql = "DELETE FROM feedback WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

    @Override
    public List<Feedback> getFeedbackByUserId(int userId) {
        String sql = "SELECT * FROM feedback WHERE user_id = ?";
        return jdbcTemplate.query(sql, feedbackRowMapper, userId);
    }
}
