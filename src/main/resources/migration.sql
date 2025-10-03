-- Migration script to add vote count columns to existing feedback table
-- Run this script on your PostgreSQL database to add missing columns

-- Check if columns exist before adding them
DO $$
BEGIN
    -- Add upvote_count column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'feedback' AND column_name = 'upvote_count'
    ) THEN
        ALTER TABLE feedback ADD COLUMN upvote_count INT DEFAULT 0;
        RAISE NOTICE 'Added upvote_count column to feedback table';
    ELSE
        RAISE NOTICE 'upvote_count column already exists in feedback table';
    END IF;

    -- Add downvote_count column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'feedback' AND column_name = 'downvote_count'
    ) THEN
        ALTER TABLE feedback ADD COLUMN downvote_count INT DEFAULT 0;
        RAISE NOTICE 'Added downvote_count column to feedback table';
    ELSE
        RAISE NOTICE 'downvote_count column already exists in feedback table';
    END IF;
END
$$;

-- Create votes table if it doesn't exist
CREATE TABLE IF NOT EXISTS votes (
    id SERIAL PRIMARY KEY,
    feedback_id INT REFERENCES feedback(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    vote_type VARCHAR(10) NOT NULL CHECK (vote_type IN ('UPVOTE', 'DOWNVOTE')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(feedback_id, user_id)
);

-- Update vote counts for existing feedback (in case there's any existing data)
UPDATE feedback SET 
    upvote_count = COALESCE((
        SELECT COUNT(*) 
        FROM votes 
        WHERE votes.feedback_id = feedback.id AND votes.vote_type = 'UPVOTE'
    ), 0),
    downvote_count = COALESCE((
        SELECT COUNT(*) 
        FROM votes 
        WHERE votes.feedback_id = feedback.id AND votes.vote_type = 'DOWNVOTE'
    ), 0);

SELECT 'Migration completed successfully!' as message;