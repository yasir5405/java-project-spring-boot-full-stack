package com.example.feedback.dao.impl;

import com.example.feedback.dao.VoteDao;
import com.example.feedback.model.Vote;
import com.example.feedback.model.Vote.VoteType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public class VoteDaoImpl implements VoteDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<Vote> voteRowMapper = new RowMapper<Vote>() {
        @Override
        public Vote mapRow(ResultSet rs, int rowNum) throws SQLException {
            Vote vote = new Vote();
            vote.setId(rs.getInt("id"));
            vote.setFeedbackId(rs.getInt("feedback_id"));
            vote.setUserId(rs.getInt("user_id"));
            vote.setVoteType(VoteType.valueOf(rs.getString("vote_type")));
            vote.setCreatedAt(rs.getObject("created_at", LocalDateTime.class));
            return vote;
        }
    };

    @Override
    public int createVote(Vote vote) {
        String sql = "INSERT INTO votes (feedback_id, user_id, vote_type) VALUES (?, ?, ?)";
        int result = jdbcTemplate.update(sql, vote.getFeedbackId(), vote.getUserId(), vote.getVoteType().name());
        if (result > 0) {
            updateFeedbackVoteCounts(vote.getFeedbackId());
        }
        return result;
    }

    @Override
    public int updateVote(Vote vote) {
        String sql = "UPDATE votes SET vote_type = ? WHERE feedback_id = ? AND user_id = ?";
        int result = jdbcTemplate.update(sql, vote.getVoteType().name(), vote.getFeedbackId(), vote.getUserId());
        if (result > 0) {
            updateFeedbackVoteCounts(vote.getFeedbackId());
        }
        return result;
    }

    @Override
    public int deleteVote(int feedbackId, int userId) {
        String sql = "DELETE FROM votes WHERE feedback_id = ? AND user_id = ?";
        int result = jdbcTemplate.update(sql, feedbackId, userId);
        if (result > 0) {
            updateFeedbackVoteCounts(feedbackId);
        }
        return result;
    }

    @Override
    public Optional<Vote> getUserVoteForFeedback(int feedbackId, int userId) {
        String sql = "SELECT * FROM votes WHERE feedback_id = ? AND user_id = ?";
        List<Vote> votes = jdbcTemplate.query(sql, voteRowMapper, feedbackId, userId);
        return votes.isEmpty() ? Optional.empty() : Optional.of(votes.get(0));
    }

    @Override
    public int getUpvoteCount(int feedbackId) {
        String sql = "SELECT COUNT(*) FROM votes WHERE feedback_id = ? AND vote_type = 'UPVOTE'";
        return jdbcTemplate.queryForObject(sql, Integer.class, feedbackId);
    }

    @Override
    public int getDownvoteCount(int feedbackId) {
        String sql = "SELECT COUNT(*) FROM votes WHERE feedback_id = ? AND vote_type = 'DOWNVOTE'";
        return jdbcTemplate.queryForObject(sql, Integer.class, feedbackId);
    }

    @Override
    public void updateFeedbackVoteCounts(int feedbackId) {
        int upvotes = getUpvoteCount(feedbackId);
        int downvotes = getDownvoteCount(feedbackId);
        
        String sql = "UPDATE feedback SET upvote_count = ?, downvote_count = ? WHERE id = ?";
        jdbcTemplate.update(sql, upvotes, downvotes, feedbackId);
    }
}