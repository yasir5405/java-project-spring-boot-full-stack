import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getAllFeedback } from "@/utils/api"; // ✅ fixed import
import {
  Inbox,
  MessageCircle,
  LogOut,
  Calendar,
  User,
  ThumbsUp,
  ThumbsDown,
  Clock,
  MessageSquare,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VoteButtons from "@/components/VoteButtons";

interface IFeedback {
  id: number;
  userId: number;
  message: string;
  createdAt: string;
  upvoteCount: number;
  downvoteCount: number;
}

const AllFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("authToken");
    setToken(tokenFromStorage);

    const fetchFeedbacks = async () => {
      try {
        const res = await getAllFeedback(tokenFromStorage || undefined);
        setFeedbacks(res.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background px-20">
      {/* Navbar */}
      <nav className="w-full py-5 flex items-center justify-between  backdrop-blur-sm border-b border-border">
        <Link
          to={token ? "/dashboard" : "/"}
          className="text-xl font-medium text-foreground flex items-center"
        >
          <MessageSquare className="h-5 w-5 text-primary mr-2" />
          Whisper<span className="text-primary">Box</span>
        </Link>

        <div className="flex gap-6">
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium hover:text-primary transition-all duration-100 ease-linear"
              >
                Dashboard
              </Link>
              <span className="text-sm font-medium text-primary border-b border-primary">
                All feedbacks
              </span>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-sm font-medium hover:text-primary transition-all duration-100 ease-linear"
              >
                Home
              </Link>
              <span className="text-sm font-medium text-primary border-b border-primary">
                All feedbacks
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {token ? (
            <Button onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      <Separator />

      <div className="flex-1 w-full flex flex-col max-w-5xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-4">
            Community Feedbacks
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Discover insights and opinions from our community. Every voice
            matters in building something great together.
          </p>
          {feedbacks.length > 0 && (
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-full border border-border/50">
                <MessageCircle size={16} className="text-primary" />
                <span className="font-medium">
                  {feedbacks.length} feedback
                  {feedbacks.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-full border border-border/50">
                <Clock size={16} className="text-primary" />
                <span className="font-medium">Latest updates</span>
              </div>
            </div>
          )}
        </div>

        {/* Feedbacks Grid */}
        {feedbacks.length >= 1 ? (
          <div className="space-y-8">
            {feedbacks.map((feedback, index) => (
              <Card
                key={feedback.id}
                className="group relative overflow-hidden border border-border/40 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 group-hover:from-primary/40 group-hover:to-primary/20 transition-all duration-300">
                          <User size={24} className="text-primary" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <CardTitle className="text-xl font-bold flex items-center gap-3">
                          Feedback #{feedback.id}
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/20">
                              Community
                            </span>
                            {index === 0 && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-700 border border-yellow-500/20">
                                Latest
                              </span>
                            )}
                          </div>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 text-base text-muted-foreground">
                          <Calendar size={16} className="text-primary" />
                          {new Date(feedback.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </CardDescription>
                      </div>
                    </div>

                    {/* Vote Summary */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-full border border-green-200">
                        <ThumbsUp size={16} className="text-green-600" />
                        <span className="font-bold text-green-700">
                          {feedback.upvoteCount}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-full border border-red-200">
                        <ThumbsDown size={16} className="text-red-600" />
                        <span className="font-bold text-red-700">
                          {feedback.downvoteCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 pb-6">
                  <div className="flex items-start justify-between gap-8">
                    {/* Feedback text */}
                    <div className="flex-1">
                      <div className="relative">
                        <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/20 rounded-full"></div>
                        <div className="bg-gradient-to-r from-accent/50 to-transparent p-6 rounded-lg border-l-4 border-primary/30">
                          <p className="text-lg leading-relaxed text-foreground font-medium italic">
                            "{feedback.message}"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Vote Buttons */}
                    <div className="flex-shrink-0 self-center">
                      <VoteButtons
                        feedbackId={feedback.id}
                        initialUpvotes={feedback.upvoteCount}
                        initialDownvotes={feedback.downvoteCount}
                        token={token || undefined}
                        onVoteChange={async () => {
                          try {
                            const res = await getAllFeedback(
                              token || undefined
                            );
                            setFeedbacks(res.data);
                          } catch (error) {
                            console.error("Error fetching feedbacks:", error);
                          }
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center mt-20 text-center max-w-lg mx-auto">
            <div className="relative mb-8">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 mb-6 shadow-lg">
                <Inbox className="h-16 w-16 text-primary" />
              </div>
              <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 h-6 w-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg"></div>
            </div>

            <h2 className="text-3xl font-bold text-foreground mb-4">
              No Feedbacks Yet
            </h2>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Be the first to share your thoughts! Your feedback helps build a
              better community experience for everyone. Every great conversation
              starts with a single voice.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Link to="/submit-feedback" className="flex-1">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all shadow-lg hover:shadow-xl"
                >
                  <MessageCircle className="mr-3 h-5 w-5" />
                  Submit Your First Feedback
                </Button>
              </Link>
              <Link to="/" className="flex-1">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-border hover:bg-accent/50 transition-all"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFeedbacks;
