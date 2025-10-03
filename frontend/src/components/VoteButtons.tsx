import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import { upvoteFeedback, downvoteFeedback, getUserVote } from "@/utils/api";

interface VoteButtonsProps {
  feedbackId: number;
  initialUpvotes: number;
  initialDownvotes: number;
  token?: string;
  onVoteChange?: () => void;
}

interface UserVote {
  voteType: "UPVOTE" | "DOWNVOTE";
}

const VoteButtons = ({
  feedbackId,
  initialUpvotes,
  initialDownvotes,
  token,
  onVoteChange
}: VoteButtonsProps) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState<UserVote | null>(null);
  const [loading, setLoading] = useState(false);

  const netVotes = upvotes - downvotes;

  const fetchUserVote = useCallback(async () => {
    if (!token) return;
    try {
      const response = await getUserVote(feedbackId, token);
      // If response is successful but data is empty/null, user hasn't voted
      setUserVote(response.data || null);
    } catch {
      // Error occurred - user hasn't voted
      setUserVote(null);
    }
  }, [feedbackId, token]);

  useEffect(() => {
    if (token) {
      fetchUserVote();
    }
  }, [token, fetchUserVote]);

  const handleUpvote = async () => {
    if (!token || loading) return;
    setLoading(true);

    try {
      await upvoteFeedback(feedbackId, token);
      
      // Update local state based on previous vote
      if (userVote?.voteType === "UPVOTE") {
        // Remove upvote
        setUpvotes(prev => prev - 1);
        setUserVote(null);
      } else if (userVote?.voteType === "DOWNVOTE") {
        // Switch from downvote to upvote
        setDownvotes(prev => prev - 1);
        setUpvotes(prev => prev + 1);
        setUserVote({ voteType: "UPVOTE" });
      } else {
        // Add new upvote
        setUpvotes(prev => prev + 1);
        setUserVote({ voteType: "UPVOTE" });
      }
      
      onVoteChange?.();
    } catch (error) {
      console.error("Error upvoting:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownvote = async () => {
    if (!token || loading) return;
    setLoading(true);

    try {
      await downvoteFeedback(feedbackId, token);
      
      // Update local state based on previous vote
      if (userVote?.voteType === "DOWNVOTE") {
        // Remove downvote
        setDownvotes(prev => prev - 1);
        setUserVote(null);
      } else if (userVote?.voteType === "UPVOTE") {
        // Switch from upvote to downvote
        setUpvotes(prev => prev - 1);
        setDownvotes(prev => prev + 1);
        setUserVote({ voteType: "DOWNVOTE" });
      } else {
        // Add new downvote
        setDownvotes(prev => prev + 1);
        setUserVote({ voteType: "DOWNVOTE" });
      }
      
      onVoteChange?.();
    } catch (error) {
      console.error("Error downvoting:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    // Show read-only vote display for unauthenticated users
    return (
      <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <ChevronUp className="h-4 w-4" />
          <span>{upvotes}</span>
        </div>
        <div className="flex items-center gap-1">
          <ChevronDown className="h-4 w-4" />
          <span>{downvotes}</span>
        </div>
        <div className="text-xs font-medium">
          {netVotes > 0 ? `+${netVotes}` : netVotes}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <Button
        variant={userVote?.voteType === "UPVOTE" ? "default" : "outline"}
        size="sm"
        onClick={handleUpvote}
        disabled={loading}
        className="h-8 w-8 p-0"
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
      
      <div className="text-sm font-medium px-2">
        {netVotes > 0 ? `+${netVotes}` : netVotes}
      </div>
      
      <Button
        variant={userVote?.voteType === "DOWNVOTE" ? "default" : "outline"}
        size="sm"
        onClick={handleDownvote}
        disabled={loading}
        className="h-8 w-8 p-0"
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default VoteButtons;