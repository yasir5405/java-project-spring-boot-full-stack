import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllFeedback } from "@/utils/api";
import { Inbox, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
interface IFeedback {
  id: number;
  userId: number;
  message: string;
  createdAt: string;
}

const AllFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) return;
    const fetchFeedbacks = async () => {
      const res = await getAllFeedback(token);
      setFeedbacks(res.data);
      console.log(res.data);
    };
    fetchFeedbacks();
  }, [token]);
  return (
    <>
      <Separator />
      <div className="flex-1 w-full flex flex-col">
        <h1 className="text-2xl font-medium mb-3 text-center">All Feedbacks</h1>
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
                <div>
                  <CardTitle className="text-base font-semibold">
                    Feedback #{feedback.id}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    {new Date(feedback.createdAt).toLocaleString()}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-start justify-between">
                  {/* feedback text */}
                  <p className="text-sm leading-relaxed text-foreground max-w-[80%]">
                    {feedback.message}
                  </p>
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

export default AllFeedbacks;
