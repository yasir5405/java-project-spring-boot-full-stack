import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useNavigate } from "react-router-dom";
import { submitFeedback } from "@/utils/api";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

interface IFeedback {
  feedback: string;
}

const FeedbackForm = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  //   console.log(token);

  const { register, handleSubmit, reset } = useForm<IFeedback>();
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const submitFeedbackHandler = async ({ feedback }: IFeedback) => {
    try {
      setSuccess("");
      setLoading(true);
      const res = await submitFeedback({ message: feedback }, token!);
      reset();
      if (res.data === "Feedback submitted successfully!") {
        setSuccess("Feedback submitted successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) navigate("/login");
  });
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit an anonymous review</DialogTitle>
          <DialogDescription>
            Submit an anonymous review without revealing yourself. Your feedback
            will be send anonymously.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(submitFeedbackHandler)}
          className="space-y-4"
        >
          <textarea
            placeholder="Write your feedback here..."
            className="min-h-[120px] w-full resize-none p-2 text-sm rounded-md 
            border border-input bg-background px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            {...register("feedback", { required: true })}
          />
          {success && (
            <p className="text-sm text-center text-green-600">{success}</p>
          )}
          <DialogFooter>
            <Button type="submit" disabled={loading} aria-disabled={loading}>
              {loading ? <Loader className="animate-spin" /> : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackForm;
