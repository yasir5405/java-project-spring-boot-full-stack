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

  const watchedMessage = watch("message");

  const isDisabled =
    !watchedMessage || watchedMessage.trim() === oldFeedback.trim();

  const handleUpdate = async ({ message }: IUpdatedFeedback) => {
    // Send as object, not string!
    const res = await updateFeedback(id, { message }, token);
    console.log(res.data);
    reset({ message });
    window.location.reload();
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
          </div>
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isDisabled} type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateFeedbackForm;
