import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateFeedback } from "@/utils/api";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface IUpdatedFeedback {
  message: string;
}

const UpdateFeedbackForm = ({
  id,
  oldFeedback,
  token,
}: {
  id: number;
  oldFeedback: string;
  token: string;
}) => {
  const { register, handleSubmit, reset, watch } = useForm<IUpdatedFeedback>({
    defaultValues: { message: oldFeedback },
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const watchedMessage = watch("message");

  const isDisabled =
    !watchedMessage || watchedMessage.trim() === oldFeedback.trim();

  const handleUpdate = async ({ message }: IUpdatedFeedback) => {
    try {
      setError("");
      setLoading(true);
      const res = await updateFeedback(id, { message }, token);
      console.log(res.data);
      reset({ message });
      window.location.reload();
    } catch (err: unknown) {
      console.error(err);
      
      // Handle content moderation errors
      interface ErrorResponse {
        response?: {
          status: number;
          data: {
            error?: string;
            message?: string;
            detectedWord?: string;
          };
        };
      }
      
      const error = err as ErrorResponse;
      if (error.response?.status === 400) {
        const errorData = error.response.data;
        if (errorData.error === "Content Moderation Violation") {
          setError(`Content blocked: Your message contains inappropriate language ("${errorData.detectedWord}"). Please revise your feedback and try again.`);
        } else {
          setError(errorData.message || "Invalid request. Please check your input.");
        }
      } else if (error.response?.status === 401) {
        setError("You must be logged in to update feedback.");
      } else {
        setError("Failed to update feedback. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit feedback</DialogTitle>
          <DialogDescription>
            Make changes to your feedbacks here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="feedback">Updated Feedback</Label>
              <Input
                id="message"
                {...register("message", { required: true })}
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">{error}</p>
            )}
          </div>
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isDisabled || loading} type="submit">
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateFeedbackForm;
