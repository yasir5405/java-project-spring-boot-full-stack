import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import UpdateFeedbackForm from "@/components/updateFeedbackForm";
import {
  deleteFeedback,
  getFeedbackByUserId,
  getUser,
  getUsers,
} from "@/utils/api";
import { jwtDecode } from "jwt-decode";
import { Inbox, MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { useEffect, useState } from "react";

interface IUser {
  id: number;
  email: string;
  password: string;
}

interface IFeedback {
  id: number;
  userId: number;
  message: string;
  createdAt: string;
  upvoteCount: number;
  downvoteCount: number;
}

const Dashboard = () => {
  const token = localStorage.getItem("authToken");
  const [user, setUser] = useState<IUser | null>(null);
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);

  useEffect(() => {
    if (!token) return;
    const decoded: { sub: string } = jwtDecode(token);
    const email = decoded.sub; // or decoded.email, depending on your JWT payload

    const fetchUser = async () => {
      const usersRes = await getUsers(token);

      const user = usersRes.data.find((u: IUser) => u.email === email);
      if (user) {
        console.log("User ID:", user.id);
        const res = await getUser(user.id, token);
        setUser(res.data);
        console.log(res.data);
      }
    };

    fetchUser();
  }, [token]);

  useEffect(() => {
    if (!user?.id || !token) return;

    const fetchFeedbacks = async () => {
      const res = await getFeedbackByUserId(user?.id, token);
      setFeedbacks(res.data);
      console.log(res.data);
    };
    fetchFeedbacks();
  }, [token, user?.id]);

  if (!user) return;

  return (
    <>
      <h1>
        Welcome to{" "}
        <span className="font-semibold text-foreground">Whisper</span>
        <span className="text-primary font-semibold">Box</span>, {user.email}
      </h1>
      <Separator />
      <div className="flex-1 w-full flex flex-col">
        <h1 className="text-2xl font-medium mb-3 text-center">My Feedbacks</h1>
        {feedbacks.length >= 1 ? (
          feedbacks.map((feedback) => (
            <Card
              key={feedback.id}
              className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow"
            >
              <CardHeader className="flex flex-row items-center gap-2 pb-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-base font-semibold">
                    Feedback #{feedback.id}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    {new Date(feedback.createdAt).toLocaleString()}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                    <ThumbsUp size={14} className="text-green-600" />
                    <span className="font-medium text-green-700">
                      {feedback.upvoteCount}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-red-50 px-2 py-1 rounded-full border border-red-200">
                    <ThumbsDown size={14} className="text-red-600" />
                    <span className="font-medium text-red-700">
                      {feedback.downvoteCount}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-start justify-between">
                  <p className="text-sm leading-relaxed text-foreground">
                    {feedback.message}
                  </p>

                  <div className="flex gap-2">
                    <UpdateFeedbackForm
                      id={feedback.id}
                      oldFeedback={feedback.message}
                      token={token!}
                    />
                    <Button
                      onClick={async () => {
                        const res = await deleteFeedback(feedback.id, token!);
                        console.log(res.data);
                        window.location.reload();
                      }}
                      size="sm"
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Inbox className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              You haven’t posted any feedback yet
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              When you post your first feedback, it will show up here. Click
              “Submit a feedback” to get started!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
